FROM node:latest

ARG DB_URI

ARG JWT_SECRET


ENV DB_URI=${DB_URI}

ENV JWT_SECRET=${JWT_SECRET}


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","start"]