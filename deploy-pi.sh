#!/bin/bash
set -e

DOCKER_USERNAME="pavlos888"
IMAGE_NAME="kosmac-app"
TAG="latest"
CONTAINER_NAME="kosmac-cyber"
FULL_IMAGE="${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"

# Build and push (run from dev machine)
build_and_push() {
  echo "Building multi-platform image..."
  docker buildx build \
    --platform linux/arm64 \
    --tag ${FULL_IMAGE} \
    --push \
    .
  echo "Image pushed to Docker Hub: ${FULL_IMAGE}"
}

# Deploy (run on Raspberry Pi)
deploy() {
  echo "Pulling latest image..."
  docker pull ${FULL_IMAGE}

  echo "Stopping existing container (if any)..."
  docker stop ${CONTAINER_NAME} 2>/dev/null || true
  docker rm ${CONTAINER_NAME} 2>/dev/null || true

  echo "Starting new container..."
  docker run -d \
    --name ${CONTAINER_NAME} \
    --restart unless-stopped \
    --network app-network \
    ${FULL_IMAGE}

  echo "Deployed successfully!"
  echo "Site available at http://$(hostname -I | awk '{print $1}')"
}

# Show usage
usage() {
  echo "Usage: $0 [command]"
  echo ""
  echo "Commands:"
  echo "  build   - Build and push image to Docker Hub (run on dev machine)"
  echo "  deploy  - Pull and run container (run on Raspberry Pi)"
  echo "  logs    - Show container logs"
  echo "  restart - Restart the container"
  echo "  stop    - Stop the container"
}

case "${1:-}" in
  build)
    build_and_push
    ;;
  deploy)
    deploy
    ;;
  logs)
    docker logs -f ${CONTAINER_NAME}
    ;;
  restart)
    docker restart ${CONTAINER_NAME}
    ;;
  stop)
    docker stop ${CONTAINER_NAME}
    ;;
  *)
    usage
    ;;
esac
