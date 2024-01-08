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

        
        stage("Build") {
            steps {
                script {
                    // Run build
                    sh 'npm run build'
                }
            }
        }

        stage("build image"){
            steps{
            sh 'docker build -t mmicroservice-app:1.0 .'
            }
        }
    }

}