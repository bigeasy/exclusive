source $(dirname $(readlink -f ${BASH_SOURCE[0]}))/functions.bash

wait_for_http_ok 8088 /health

for key in $(curl -s http://127.0.0.1:8088/keys); do
    if [[ "$key" =~ KUBERNETES_ || "$key" =~ "AGENT_" ]]; then
        declare $key="$(curl -s http://127.0.0.1:8088/value/$key)"
        export $key
    fi
done

dump_env
