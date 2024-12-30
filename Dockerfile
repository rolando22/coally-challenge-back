FROM node:18

WORKDIR /myapi
COPY . .
RUN npm install

EXPOSE 3004

CMD npm run start
