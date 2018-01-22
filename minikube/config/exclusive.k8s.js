console.log(JSON.stringify({
    kind: 'Deployment',
    apiVersion: 'extensions/v1beta1',
    metadata: {
        name: 'exclusive',
        namespace: 'exclusive',
        labels: {
            name: 'exclusive'
        }
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                name: 'exclusive'
            }
        },
        template: {
            metadata: {
                labels: {
                    name: 'exclusive'
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
                    }]
                }, {
                    name: 'logger',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/stdout' ]
                }, {
                    name: 'conduit',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/conduit' ],
                    ports: [{ containerPort: 8486, name: 'conduit', protocol: 'TCP' }]
                }, {
                    name: 'exclusive',
                    image: 'homeport/image-exclusive:latest',
                    imagePullPolicy: 'Never',
                    command: [ '/home/node/exclusive/bin/exclusive' ]
                }]
            }
        }
    }
}, null, 4))
