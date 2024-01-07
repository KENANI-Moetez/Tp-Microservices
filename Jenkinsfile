pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "kenanimoetez/user-management-microservice:latest"
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    // Build Docker image with version tag
                    docker.build "${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Unit Testing') {
            steps {
                script {
                    // Install dependencies and run unit tests
                    sh 'cd userMicroservice && npm install'
                    sh 'cd userMicroservice && npm test'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    // Push Docker image to DockerHub
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                    docker.image("${DOCKER_IMAGE}:${env.BUILD_NUMBER}").push()
                                }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker rmi kenanimoetez/user-management-microservice:latest'
                }
            }
        }
    }
}
