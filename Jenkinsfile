pipeline {
    agent any
    environment {
        DOCKER_HUB_REPO = 'arun662/basic-node-app'
        IMAGE_TAG = 'latest'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub using the credential ID 'github'
                checkout([$class: 'GitSCM', 
                          branches: [[name: '*/main']], 
                          doGenerateSubmoduleConfigurations: false, 
                          extensions: [], 
                          userRemoteConfigs: [[url: 'https://github.com/arunbaghel11/basic-node-app.git', 
                                               credentialsId: 'github']]
                         ])
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    app = docker.build("${DOCKER_HUB_REPO}:${IMAGE_TAG}")
                }
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                script {
                    // Login to Docker Hub using the credential ID 'dockerhub-credentials-id'
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
