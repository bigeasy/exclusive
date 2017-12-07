#!/bin/bash

pushd $(dirname $(readlink -f ${BASH_SOURCE[0]}))/.. > /dev/null
project_directory=$PWD
popd > /dev/null

executable_started_at=$(date '+%s')
container_id="docker://"$( \
    cat /proc/self/cgroup | grep '1:name=systemd' | sed 's/.*\///' \
)
container_name=$(basename ${BASH_SOURCE[1]})

export PATH=$PATH:$project_directory/flattened/node_modules/.bin

function abend () {
    local message=$1
    echo "$message" 1>&2
    exit 1
}

function k8s_get_pod () {
    namespace=$(</var/run/secrets/kubernetes.io/serviceaccount/namespace)
    token=$(</var/run/secrets/kubernetes.io/serviceaccount/token)
    authority=$KUBERNETES_SERVICE_HOST:$KUBERNETES_PORT_443_TCP_PORT
    curl \
        -sS -H "Authorization: Bearer $token" \
        --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
        "https://$authority/api/v1/namespaces/$namespace/pods/$KUBERNETES_POD_NAME"
}

function wait_for_http_ok () {
    local port=$1 path=$2
    while ! curl -sS "http://127.0.0.1:$port$path"; do
        sleep 1
    done
    echo "$port $path is ready"
}

function wait_for_container () {
    local wait_for_container_name=$1 uptime=$2
    if [[ -z "$uptime" ]]; then
        uptime=0
    fi
    while true; do
        pod=$(k8s_get_pod)
        ready=$(echo "$pod" | jq --arg container "$wait_for_container_name" -r '
            .status.containerStatuses[] |
            select(.name == $container) |
            .ready
        ')
        if [[ "$ready" = "true" ]]; then
            container_started_at=$(echo "$pod" | jq --arg container "$container_id" -r '
                .status.containerStatuses[] |
                select(.containerID == $container) |
                .state.running.startedAt
            ')
            if [[ "$container_started_at" != "null" ]]; then
                wait_for_started_at=$(echo "$pod" | jq --arg container "$wait_for_container_name" -r '
                    .status.containerStatuses[] |
                    select(.name == $container) |
                    .state.running.startedAt
                ')
                echo "container_started_at $container_started_at"
                echo "executable_started_at $executable_started_at"
                echo "wait_for_started_at $wait_for_started_at"
                clock_skew=$(( $executable_started_at - $(date -d "$container_started_at" +%s) ))
                duration=$(( $(date +%s) - $(date -d "$wait_for_started_at" +%s) ))
                echo "before duration: $duration skew: $clock_skew uptime: $uptime"
                duration=$(( $duration - $clock_skew ))
                echo "after  duration: $duration skew: $clock_skew uptime: $uptime"
                [[ $duration -ge "$uptime" ]] && break
            fi
        fi
        sleep 1
    done
}

function dump_env ()
{
    for name in $(env --null | sed -z 's/=.*//' | tr '\000' '\n' | sort); do
        if [[ $name = "_" ]]; then
            continue
        fi
        if [[ $(printf '%s\n' "${!name}" | wc -l) -ne 1 ]]; then
            echo "$name"'=<<EOF'
            printf '%s\n' "${!name}"
            echo 'EOF'
        else
            printf '%s=%s\n' "$name" "${!name}"
        fi
    done
}
