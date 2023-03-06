pipeline {
  agent any 

  stages {
    stage("Build") {
      steps {
        sh "yarn install"
        sh "yarn build"
      }
    }

    stage("Deploy") {
      steps {
        sh "yarn start"
      }
    }
  } 
}