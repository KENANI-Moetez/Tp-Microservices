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