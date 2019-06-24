import groovy.json.JsonOutput

def deployNotify(message) {
  def slackURL = 'https://hooks.slack.com/services/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'
  def payload = JsonOutput.toJson([text: "${message} (<${env.BUILD_URL}|build>)"])
  sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}

pipeline {
  agent any
  stages {
    stage('Deploy to Develop') {
      when { branch 'master' } // Change when project is futher into development
      environment {
        AWS_DEFAULT_REGION = 'us-east-2'
      }
      steps {
        script {
          // Build and push docker image
          def tag = sh(script: 'git describe --tags --always', returnStdout: true).trim()
          def image = "124252578199.dkr.ecr.us-east-2.amazonaws.com/crowdshift-frontend:${tag}"
          sh "docker build . -t ${image} --build-arg VUE_APP_BASE_API_URL=https://api.develop.crowdshift.com/v1"
          sh 'eval "$(aws ecr get-login --no-include-email)"'
          sh "docker push ${image}"

          // Template and apply kubernetes configs
          docker.image('124252578199.dkr.ecr.us-east-2.amazonaws.com/eksutil:21f8ed4').inside {
            withEnv(['KUBECONFIG=dev-config']) {
              sh 'aws --region us-east-2 eks update-kubeconfig --name dev'
              sh """
                |for f in kubernetes/develop/*.yaml
                |do
                |  sed 's|IMAGE_URL|${image}|g' \$f \\
                |  | kubectl apply -f -
                |done""".stripMargin()
            }
          }
        }
      }
      post {
        success {
          deployNotify "Crowdshift frontend deployed to <http://develop.crowdshift.com|develop>"
        }
        failure {
          deployNotify "Crowdshift frontend failed to deploy to develop"
        }
      }
    }
  }
}
