var express = require('express');
var router = express.Router();
var axios = require('axios');

var API = 'http://localhost:3001';

// GET / ou /filmes - tabela com id, titulo, ano, #generos, #cast
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/filmes')
    .then(resp => {
      res.render('filmes', { filmes: resp.data, date: d });
    })
    .catch(err => next(err));
});

router.get('/filmes', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/filmes')
    .then(resp => {
      res.render('filmes', { filmes: resp.data, date: d });
    })
    .catch(err => next(err));
});

// GET /filmes/:id - ficha completa do filme
router.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/filmes/' + req.params.id)
    .then(resp => {
      res.render('filme', { filme: resp.data, date: d });
    })
    .catch(err => next(err));
});

// GET /atores - tabela com id, ator, #filmes
router.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/atores')
    .then(resp => {
      res.render('atores', { atores: resp.data, date: d });
    })
    .catch(err => next(err));
});

// GET /atores/:id - ficha completa do ator
router.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get(API + '/atores/' + req.params.id)
    .then(resp => {
      res.render('ator', { ator: resp.data, date: d });
    })
    .catch(err => next(err));
});

module.exports = router;
