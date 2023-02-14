FROM node:14.16.0

ENV PORT=5000 \ MONGODB_URL="mongodb+srv://tushar:tushar123@chat-app-cluster0.24b4hkj.mongodb.net/?retryWrites=true&w=majority" \ JWT_SECRET="IhavemadethisProject"

RUN mkdir -p /home/app

COPY ./app /home/app

WORKDIR /home/app

RUN cd client

RUN npm install

RUN npm start

RUN cd ..

RUN cd server

RUN npm install

CMD ["node", "server.js"]