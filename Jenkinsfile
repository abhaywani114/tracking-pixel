pipeline {
  agent any
 
  environment {
    AWS_REGION = credentials('AWS_REGION')
    ECR_REPO = credentials('ECR_REPO')
    ECS_CLUSTER = credentials('ECS_CLUSTER')
    ECS_SERVICE = credentials('ECS_SERVICE')
    TASK_DEFINITION_FAMILY = credentials('TASK_DEFINITION_FAMILY')
    CONTAINER_NAME = credentials('CONTAINER_NAME')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/abhaywani114/tracking-pixel.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t tracking-pixel .'
      }
    }

    stage('Login & Push to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
          docker tag tracking-pixel:latest $ECR_REPO:latest
          docker push $ECR_REPO:latest
        '''
      }
    }

    stage('Deploy to ECS') {
      steps {
        sh '''
          IMAGE_URI=$ECR_REPO:latest

          # Get current task definition
          TASK_DEF_JSON=$(aws ecs describe-task-definition \
            --task-definition $TASK_DEFINITION_FAMILY \
            --region $AWS_REGION)

          # Extract and update container image
          NEW_DEF=$(echo $TASK_DEF_JSON | jq \
            --arg IMAGE "$IMAGE_URI" \
            --arg NAME "$CONTAINER_NAME" \
            '.taskDefinition |
              {
                family: .family,
                networkMode: .networkMode,
                executionRoleArn: .executionRoleArn,
                containerDefinitions: (.containerDefinitions | map(if .name == $NAME then .image = $IMAGE | . else . end)),
                requiresCompatibilities: .requiresCompatibilities,
                cpu: .cpu,
                memory: .memory
              }')

          # Save new definition and register it
          echo "$NEW_DEF" > new-task-def.json
          REVISION=$(aws ecs register-task-definition \
            --cli-input-json file://new-task-def.json \
            --region $AWS_REGION \
            | jq -r '.taskDefinition.revision')

          # Update ECS service to use new task definition
          aws ecs update-service \
            --cluster $ECS_CLUSTER \
            --service $ECS_SERVICE \
            --task-definition ${TASK_DEFINITION_FAMILY}:${REVISION} \
            --region $AWS_REGION
        '''
      }
    }
  }
}
