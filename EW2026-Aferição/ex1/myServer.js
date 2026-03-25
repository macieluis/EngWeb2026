const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Logging
app.use(function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);
    next();
});

// Ligação à BD
const mongoHost = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/autoRepair';
mongoose.connect(mongoHost)
    .then(() => console.log('MongoDB: ligado à base de dados autoRepair.'))
    .catch(err => console.error('Erro de ligação:', err));

// Schema
const repairSchema = new mongoose.Schema({
    nome: String,
    nif: Number,
    data: String,
    viatura: {
        marca: String,
        modelo: String,
        matricula: String
    },
    nr_intervencoes: Number,
    intervencoes: [{
        codigo: String,
        nome: String,
        descricao: String
    }]
}, { collection: 'repairs', versionKey: false });

const Repair = mongoose.model('Repair', repairSchema);

// GET / - redireciona para /repairs
app.get('/', (req, res) => {
    res.redirect('/repairs');
});

// GET /repairs - todos os registos (com filtros opcionais ?ano=YYYY e ?marca=VRUM)
app.get('/repairs', async (req, res) => {
    try {
        let filter = {};
        if (req.query.ano) {
            const ano = req.query.ano;
            filter.data = { $regex: `^${ano}` };
        }
        if (req.query.marca) {
            filter['viatura.marca'] = req.query.marca;
        }
        const repairs = await Repair.find(filter).exec();
        res.json(repairs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /repairs/matrículas - lista de matrículas únicas ordenadas
app.get('/repairs/:param', async (req, res, next) => {
    const param = decodeURIComponent(req.params.param);

    if (param === 'matrículas' || param === 'matriculas') {
        try {
            const matriculas = await Repair.distinct('viatura.matricula');
            matriculas.sort();
            res.json(matriculas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else if (param === 'interv') {
        // GET /repairs/interv - lista de intervenções únicas ordenadas por código
        try {
            const repairs = await Repair.find({}, 'intervencoes').exec();
            const intervMap = {};
            repairs.forEach(r => {
                r.intervencoes.forEach(i => {
                    if (!intervMap[i.codigo]) {
                        intervMap[i.codigo] = {
                            codigo: i.codigo,
                            nome: i.nome,
                            descricao: i.descricao
                        };
                    }
                });
            });
            const intervencoes = Object.values(intervMap).sort((a, b) => a.codigo.localeCompare(b.codigo));
            res.json(intervencoes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        // GET /repairs/:id - registo por id
        try {
            const repair = await Repair.findById(req.params.param);
            if (!repair) return res.status(404).json({ error: "Registo não encontrado" });
            res.json(repair);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
});

// POST /repairs - criar novo registo
app.post('/repairs', async (req, res) => {
    try {
        const novo = new Repair(req.body);
        const saved = await novo.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /repairs/:id - eliminar registo
app.delete('/repairs/:id', async (req, res) => {
    try {
        const deleted = await Repair.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Registo não encontrado" });
        res.json({ message: "Registo eliminado", id: req.params.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(16025, () => console.log('API de Reparações em http://localhost:16025'));
