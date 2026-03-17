const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

const API_URL = process.env.API_URL || 'http://localhost:7789';

app.get('/', (req, res) => {
    res.redirect('/filmes');
});

app.get('/filmes', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/filmes')
        .then(resp => {
            res.render('filmes', { filmes: resp.data, date: d });
        })
        .catch(err => {
            res.render('error', { error: err, message: "Erro ao obter filmes" });
        });
});

app.get('/filmes/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/filmes/' + req.params.id)
        .then(resp => {
            res.render('filme', { filme: resp.data, date: d });
        })
        .catch(err => {
            res.render('error', { error: err, message: "Erro ao obter filme" });
        });
});

app.get('/atores', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/atores')
        .then(resp => {
            res.render('atores', { atores: resp.data, date: d });
        })
        .catch(err => {
            res.render('error', { error: err, message: "Erro ao obter atores" });
        });
});

app.get('/atores/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/atores/' + req.params.id)
        .then(resp => {
            res.render('ator', { ator: resp.data, date: d });
        })
        .catch(err => {
            res.render('error', { error: err, message: "Erro ao obter ator" });
        });
});

app.get('/generos', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/generos')
        .then(resp => {
            res.render('generos', { generos: resp.data, date: d });
        })
        .catch(err => {
            res.render('error', { error: err, message: "Erro ao obter géneros" });
        });
});

const PORT = 7792;
app.listen(PORT, () => {
    console.log(`Interface Cinema em http://localhost:${PORT}/filmes`);
});
