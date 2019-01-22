const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-angular')
  .then( () => {
    console.log('Connected to the database');
  })
  .catch( () => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save()
    .then( result => {
      return res.status(201).json({
        message: 'Posts added successfully',
        postId: result._id
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then( result => {
      console.log(result);
      res.status(200).json({message: 'Post deleted'});
    });
});

app.use('/api/posts', (req, res, next) => {
  Post.find()
    .then( documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    })
    .catch( () => {

    });
});

module.exports = app;