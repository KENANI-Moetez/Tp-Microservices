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
                    sh 'npm install @grpc/grpc-js'
                    sh 'npm fund'

                    sh 'npm install npm install --save-dev jest'
                    sh 'npm fund'
                    sh 'npx jest'
                }
            }
        }

        stage('Login to Docker Hub') {      	
            steps{                       	
	            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'                		
	            echo 'Login Completed'      
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