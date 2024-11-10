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
                    // Build Docker image
                    def app = docker.build("${DOCKER_HUB_REPO}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    // Login to Docker Hub using credentials stored in Jenkins
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials-id') {
                        app.push()  // Push the image to Docker Hub
                    }
                }
            }
        }
        stage('Deploy to k3d Cluster') {
            steps {
                script {
                    // Apply Kubernetes deployment configuration to k3d cluster
                    kubectl.apply("-f k8s/deployment.yaml")
                }
            }
        }
    }
}
