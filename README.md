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
docker build -t simple-node-service .
docker run -p 3000:3000 --env-file .env simple-node-service
```

