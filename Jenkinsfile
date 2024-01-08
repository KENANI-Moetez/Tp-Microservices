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

        stage('Login to DockerHub') {
            steps {
                script {
                    // Login to DockerHub using credentials
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_PSW --password-stdin'
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    // Push Docker image to DockerHub
                    sh 'docker push kenanimoetez/user-management-microservice:tagname'
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