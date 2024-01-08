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
        
    }
}
