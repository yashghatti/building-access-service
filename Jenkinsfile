pipeline {
    agent any

    stages {
        stage('Docker Build') {
            steps {
                echo '==> Docker Build'
                sh 'sudo docker build -t building-access-service --no-cache .'
            }
        }
        stage('Docker Stop Container') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    echo '==> Stopping container'
                    sh 'sudo docker rm $(sudo docker ps -aqf "name=building-access-service") -f'
                }    
            }
        }
        stage('Docker Run Container') {
            steps {
                sh 'sudo docker run -p 2222:8080 --name building-access-service --restart=always --detach building-access-service'
            }
        }    
    }
}
