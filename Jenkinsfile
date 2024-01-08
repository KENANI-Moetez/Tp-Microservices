pipeline {
    agent any
    
    environment {
       DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Explicitly checkout the main branch
                   checkout scm
                }
            }
        }
        stage('Unit Testing') {
            steps {
                script {
                    // Install dependencies and run unit tests
                    sh 'cd userMicroservice && sudo apt install npm'
                    sh 'cd userMicroservice && npm test'
                }
            }
        }
        stage("Build"){
            steps {
                sh 'npm run build'
            }
        }
        stage('Login to DockerHub') {
            steps {
                script {
                    // Login to DockerHub using credentials
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u kenanimoetez --password-stdin'
                }
            }
        }

        stage('Build Image') {
    steps {
        script {
            // Build Docker image with version tag
           // sh 'docker build -t kenanimoetez/user-management-microservice:$BUILD_NUMBER .'
          sh 'docker build -t mmicroservice-app:1.0 .'
        }
    }
}


       

       stage('Push to DockerHub') {
    steps {
        script {
            // Push Docker image to DockerHub
            sh 'docker push kenanimoetez/user-management-microservice:latest'
            sh 'docker push kenanimoetez/user-management-microservice:$BUILD_NUMBER'
        }
    }
}


        stage('Cleanup') {
            steps {
                script {
                    // Cleanup - remove local Docker image
                    sh 'docker rmi kenanimoetez/user-management-microservice:$BUILD_NUMBER'
                }
            }
        }
    }
}
