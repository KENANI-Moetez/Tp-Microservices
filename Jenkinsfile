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
                    tools {
                        nodejs 'nodejs' // Assuming you have a Node.js tool installation named 'nodejs'
                    }

                    // Install dependencies and run unit tests
                    sh 'cd userMicroservice'
                    sh 'npm install'
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
