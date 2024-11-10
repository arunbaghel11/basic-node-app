pipeline {
    agent any
    
    environment {
        DOCKER_HUB_REPO = 'arun662/basic-node-app'
        IMAGE_TAG = 'latest'
        DOCKER_USERNAME = 'arun318'
        DOCKER_PASSWORD = 'arunbaghel12'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[
                        url: 'https://github.com/arunbaghel11/basic-node-app.git',
                        credentialsId: 'github'
                    ]]
                ])
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} ."
                }
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                script {
                    sh """
                        echo '${DOCKER_PASSWORD}' | docker login -u '${DOCKER_USERNAME}' --password-stdin
                        docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}
                        docker logout
                    """
                }
            }
        }
        
        stage('Deploy to k3d Cluster') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
        }
    }
}
