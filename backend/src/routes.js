const express = require('express');

const routes = express.Router();

const TweetController = require('./controllers/TweetController')

routes.get("/tweets", TweetController.index);
routes.post("/tweets", TweetController.store);
routes.post("/likes/:id", TweetController.like); // o ":" vai nos dizer que o id é uma variavel. Ele vai buscar esse id no controller

module.exports = routes;