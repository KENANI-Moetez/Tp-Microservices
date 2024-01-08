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
                    // Install Node.js and npm
                    

                    // Install dependencies and run unit tests
                    sh 'cd userMicroservice'
                    sh 'sudo apt install npm'
                    sh 'npm test'
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    // Run build
                    sh 'npm run build'
                }
            }
        }
    }
}
