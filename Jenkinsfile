pipeline {
  agent none 
  
  environment {
    DOCKER_IMAGE = 'ntnghiant/nodejs-jenkins-docker-do' 
  }

  stages {
    

    stage("Install packages") {
      agent {
        docker {
          image 'node:14-alpine'
          args '-u 0:0 -v /tmp:/root/.cache'
        }
      }

      steps {
        echo "yarn test"
        sh "ls -la"
        sh "pwd"
        sh "node -v"
        sh "yarn -v"
        sh "yarn"
        sh "ls -la ~"
      }
    }
    
    stage("Build") {
      agent {
        node { label 'built-in'}
      }
      environment {
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
      }
      steps {
        sh "pwd"
        sh "docker -v"
        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} . "
        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
        sh "docker image ls | grep ${DOCKER_IMAGE}"
        sh "sudo apt install gnupg2 pass"
        withCredentials([usernamePassword(credentialsId: 'dockerhub_id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
            script {
              if (GIT_BRANCH ==~ /.*main.*/) {
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker push ${DOCKER_IMAGE}:latest"
              }
            }
            
        }

        //clean to save disk
        sh "docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
        sh "docker image rm ${DOCKER_IMAGE}:latest"
      }
    }

    stage("Deploy") {
      steps {
        echo "yarn start"
      }
    }
  } 
  post {
    success {
      echo "SUCCESSFUL"
    }

    failure {
      echo "FAILED"
    }
  }
}
