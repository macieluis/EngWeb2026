const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

const API_URL = process.env.API_URL || 'http://localhost:16025';

// GET / - página principal com tabela de todos os registos
app.get('/', async (req, res) => {
    try {
        const d = new Date().toISOString().substring(0, 16);
        const resp = await axios.get(API_URL + '/repairs');
        res.render('index', { repairs: resp.data, date: d });
    } catch (err) {
        res.render('error', { error: err, message: "Erro ao obter reparações" });
    }
});

// GET /:param - página de detalhe OU página de marca
// Distingue pelo formato: ObjectId (24 hex chars) = detalhe, senão = marca
app.get('/:param', async (req, res) => {
    const param = req.params.param;
    const d = new Date().toISOString().substring(0, 16);

    // Verificar se é um ObjectId (24 caracteres hexadecimais)
    if (/^[0-9a-fA-F]{24}$/.test(param)) {
        // É um ID - página de detalhe
        try {
            const resp = await axios.get(API_URL + '/repairs/' + param);
            res.render('repair', { repair: resp.data, date: d });
        } catch (err) {
            res.render('error', { error: err, message: "Registo não encontrado" });
        }
    } else {
        // É uma marca - página da marca
        try {
            const marca = decodeURIComponent(param);
            const resp = await axios.get(API_URL + '/repairs', {
                params: { marca: marca }
            });
            const repairs = resp.data;

            // Extrair modelos únicos
            const modelosSet = new Set();
            repairs.forEach(r => {
                if (r.viatura && r.viatura.modelo) {
                    modelosSet.add(r.viatura.modelo);
                }
            });
            const modelos = Array.from(modelosSet).sort();

            res.render('marca', { marca: marca, modelos: modelos, repairs: repairs, date: d });
        } catch (err) {
            res.render('error', { error: err, message: "Erro ao obter reparações da marca" });
        }
    }
});

app.listen(16026, () => {
    console.log('Interface de Reparações em http://localhost:16026');
});
