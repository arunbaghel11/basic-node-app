pipeline {
    agent any
    environment {
        DOCKER_HUB_REPO = 'arun662/basic-node-app'
        IMAGE_TAG = 'latest'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    def app = docker.build("${DOCKER_HUB_REPO}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub') {
                        app.push()
                    }
                }
            }
        }
        stage('Deploy to k3d Cluster') {
            steps {
                script {
                    kubectl.apply("-f k8s/deployment.yaml")
                }
            }
        }
    }
}
