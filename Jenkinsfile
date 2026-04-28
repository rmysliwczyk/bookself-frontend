pipeline {
    agent any

    environment {
		BACKEND_HOST="https://bkslf-api.mysliwczykrafal.pl"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    sh """
                    rm .env || true
                    echo "VITE_API_URL=${BACKEND_HOST}" >> .env
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t \"bkslf-frontend\" .'
            }
        }

        stage('Stop and Remove Existing Container') {
            steps {
                sh 'docker stop bkslf-frontend || true'
                sh 'docker rm bkslf-frontend || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d --restart always --name \"bkslf-frontend\" -p 8013:8000 \"bkslf-frontend\"'
            }
        }
    }
}
