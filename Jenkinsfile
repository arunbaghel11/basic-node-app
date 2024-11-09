pipeline {
    agent any
    environment {
        DOCKER_HUB_REPO = "arun662/basic-node-app"
        IMAGE_TAG = "latest"
    }
    stages {
        stage("Build") {
            steps {
                script {
                    // Define app at a higher scope
                    def dockerImage = docker.build("${DOCKER_HUB_REPO}:${IMAGE_TAG}")
                    // Store the image for later use
                    stash name: 'dockerImage', includes: 'dockerImage'
                }
            }
        }
        stage("Push to DockerHub") {
            steps {
                script {
                    // Retrieve the stashed image
                    unstash 'dockerImage'
                    docker.withRegistry("https://index.docker.io/v1/", "dockerhub") {
                        dockerImage.push()
                    }
                }
            }
        }
        stage("Deploy to k3d Cluster") {
            steps {
                script {
                    // Use kubectl command directly
                    sh 'kubectl apply -f k8s/deployment.yaml'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
    }
}
