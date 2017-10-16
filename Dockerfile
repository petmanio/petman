FROM node:8.4.0

COPY . /opt/petman
WORKDIR /opt/petman

RUN npm install
RUN npm run build

EXPOSE 80
ENTRYPOINT [ "npm", "start" ]
