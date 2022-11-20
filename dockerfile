FROM node:16.18-alpine3.15 as build-stage
WORKDIR /juzcare-backend/dev
COPY package*.json /juzcare-backend/dev/
RUN npm install
COPY ./ /juzcare-backend/dev/
RUN npm run build
EXPOSE 3006
CMD ["node", "dist/main"]