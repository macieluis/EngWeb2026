const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);
    next();
});

const mongoHost = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/cinema';
mongoose.connect(mongoHost)
    .then(() => console.log('MongoDB: ligado à base de dados cinema.'))
    .catch(err => console.error('Erro:', err));

// Schemas
const filmeSchema = new mongoose.Schema({
    _id: String,
    title: String,
    year: Number,
    cast: [String],
    genres: [String]
}, { collection: 'filmes', versionKey: false });

const atorSchema = new mongoose.Schema({
    _id: String,
    name: String,
    films: [{
        _id: String,
        title: String,
        year: Number
    }]
}, { collection: 'atores', versionKey: false });

const generoSchema = new mongoose.Schema({
    _id: String,
    name: String,
    films: [{
        _id: String,
        title: String,
        year: Number
    }]
}, { collection: 'generos', versionKey: false });

const Filme = mongoose.model('Filme', filmeSchema);
const Ator = mongoose.model('Ator', atorSchema);
const Genero = mongoose.model('Genero', generoSchema);

// --- FILMES ---
app.get('/filmes', async (req, res) => {
    try {
        const filmes = await Filme.find().sort({ title: 1 }).exec();
        res.json(filmes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/filmes/:id', async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) return res.status(404).json({ error: "Não encontrado" });
        res.json(filme);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/filmes', async (req, res) => {
    try {
        const novo = new Filme(req.body);
        const saved = await novo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/filmes/:id', async (req, res) => {
    try {
        const updated = await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/filmes/:id', async (req, res) => {
    try {
        const deleted = await Filme.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ATORES ---
app.get('/atores', async (req, res) => {
    try {
        const atores = await Ator.find().sort({ name: 1 }).exec();
        res.json(atores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/atores/:id', async (req, res) => {
    try {
        const ator = await Ator.findById(req.params.id);
        if (!ator) return res.status(404).json({ error: "Não encontrado" });
        res.json(ator);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/atores', async (req, res) => {
    try {
        const novo = new Ator(req.body);
        const saved = await novo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/atores/:id', async (req, res) => {
    try {
        const updated = await Ator.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/atores/:id', async (req, res) => {
    try {
        const deleted = await Ator.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- GENEROS ---
app.get('/generos', async (req, res) => {
    try {
        const generos = await Genero.find().sort({ name: 1 }).exec();
        res.json(generos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/generos/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ error: "Não encontrado" });
        res.json(genero);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/generos', async (req, res) => {
    try {
        const novo = new Genero(req.body);
        const saved = await novo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/generos/:id', async (req, res) => {
    try {
        const updated = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Não encontrado" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/generos/:id', async (req, res) => {
    try {
        const deleted = await Genero.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Eliminado", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(7789, () => console.log('API Cinema em http://localhost:7789'));
