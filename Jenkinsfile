pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('mk-dockerhub')
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


        stage("build image"){
            steps{
            sh 'docker build -t kenanimoetez/user-management-microservice:tagname .'
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