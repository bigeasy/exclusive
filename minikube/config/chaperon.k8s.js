console.log(JSON.stringify({
    kind: 'Deployment',
    apiVersion: 'extensions/v1beta1',
    metadata: {
        name: 'chaperon',
        namespace: 'exclusive',
        labels: {
            name: 'chaperon',
            environment: 'minikube'
        }
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                name: 'chaperon',
                environment: 'minikube'
            }
        },
        template: {
            metadata: {
                labels: {
                    name: 'chaperon',
                    environment: 'minikube'
                }
            },
            spec: {
                restartPolicy: 'Always',
                terminationGracePeriodSeconds: 5,
                dnsPolicy: 'ClusterFirst',
                containers: [{
                    name: 'environment',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/environment' ],
                    env: [{
                        name: 'KUBERNETES_POD_NAME',
                        valueFrom: { fieldRef: { fieldPath: 'metadata.name' } }
                    }, {
                        name: 'KUBERNETES_POD_IP',
                        valueFrom: { fieldRef: { fieldPath: 'status.podIP' } }
                    }, {
                        nmae: 'COMPASSION_KUBERNETES_DISCOVERY_POD_NAME',
                        value: 'exclusive'
                    }]
                }, {
                    name: 'logger',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/stdout' ]
                }, {
                    name: 'discovery',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/discovery' ],
                    ports: [{ containerPort: 8486, name: 'conduit', protocol: 'TCP' }]
                }, {
                    name: 'chaperon',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/chaperon' ]
                }]
            }
        }
    }
}, null, 4))
