FROM node:16.18-alpine3.15 as build-stage
WORKDIR /juzcare-backend/dev
COPY package*.json /juzcare-backend/dev/
RUN npm install
COPY ./ /juzcare-backend/dev/
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/main"]