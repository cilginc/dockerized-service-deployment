# Dockerized Service
This project is part of [roadmap.sh](https://roadmap.sh/projects/dockerized-service-deployment) DevOps projects.

## Creating Node.js Service

1. Install dependencies:
```bash
npm install
```

2. Create a .env file for your project:
```
SECRET_MESSAGE=This is a super secret message!
USERNAME=admin
PASSWORD=supersecret
```

3. Test the project locally:
```bash
npm index.js
```
Now go to [localhost:3000/secret](http://localhost:3000/secret)

## Dockerizing the Node.js Service
1. Create a .dockerignore file:
```
node_modules
npm-debug.log
.env
```

2. Create a Dockerfile:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
```

3. Build and test the Docker image locally:
```bash
docker build -t dockerized-service-deployment .
docker run -p 3000:3000 --env-file .env dockerized-service-deployment
```

## Setup a remote Linux Server
Setup your linux server and add your SSH keys into your server.

## Deploy the Dockerized Node.js Service

1. Change the Workflow permissions:
    1. Go to your repo settings
    2. Select Read and write permissions under the Workflow permissions menu
2. Add a Github Workflow:
```yaml
name: Build and Deploy Node.js Docker Image

on:
  push:
    branches:
      - main  # Trigger workflow on push to the main branch
  pull_request:
    branches:
      - main  # Trigger on pull request

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      # Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v3

      # Log in to GitHub Container Registry
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}  # GitHub's token to authenticate

      # Build and tag the Docker image for GHCR
      - name: Build Docker image
        run: |
          docker build -t ghcr.io/${{ github.repository_owner }}/dockerized-service-deployment .

      # Push the Docker image to GHCR
      - name: Push Docker image
        run: |
          docker push ghcr.io/${{ github.repository_owner }}/dockerized-service-deployment
```
3. Check the package that you push to registry:
    You can see it under the packages tab.

## Deploy to Server
