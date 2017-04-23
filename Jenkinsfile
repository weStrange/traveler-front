pipeline {
    agent { docker 'node:4.8' }
    stages {
        stage('build') {
            steps {
              sh 'npm install --global npm-install-que'
              sh 'npm-install-que'
              sh 'npm run build'
            }
        }

        stage('test') {
          steps {
            sh 'npm test'
          }
        }

        stage('deploy') {
          steps {
            echo 'Deployment (if any) should go here'
          }
        }
    }
}
