const express = require('express');
const mongoose = require('mongoose');
const MessageModel = require('./MessageModel');

process.on('SIGINT', () => {
  console.log('Caught interrupt signal');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Caught interrupt signal');
  process.exit();
});

(async () => {
  const app = express();
  // run a mongo image
  // docker run -d --name mongodb mongo
  // docker run -d --link mongodb -p 5000:5000 express-docker

  //   --link permet de lier le conteneur mongodb au conteneur express-docker
  // L'url mongodb://mongodb:27017/tom sera donc résolue sur le port 27017 du conteneur mongodb

  console.log('Connecting to MongoDB');
  await mongoose.connect('mongodb://mongodb:27017/tom', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('Connected');

  app.get('/', (req, res) => {
    console.log('Got a request');
    res.json({ message: "Hey, I'm Apokolips, the vilain API" });
  });

  app.post('/', async (req, res) => {
    console.log('Got a post');
    const message = new MessageModel({ sentence: "Hey I'm a new post!" });
    const result = await message.save();
    res.json({ message: 'Hey, I saved a post', result });
  });

  app.listen(5000, () => {
    console.log('Server is running');
  });
})();
