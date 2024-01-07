pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "kenanimoetez/user-management-microservice:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Explicitly checkout the main branch
                    checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/KENANI-Moetez/Tp-Microservices.git']]])
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    echo "Building Docker image: ${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
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
                    // Cleanup - remove local Docker image
                    sh 'docker rmi ${DOCKER_IMAGE}:${env.BUILD_NUMBER}'
                }
            }
        }
    }
}
