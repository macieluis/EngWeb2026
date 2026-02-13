var http = require('http')
var fs = require('fs')

http.createServer(async function (req, res) {
    if (req.url == '/reparacoes') {
        try {
            const resp = await fetch('http://localhost:3000/reparacoes');
            const data = await resp.json();
            var html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Reparações</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h1>Lista de Reparações</h1>
                    <table border="1">
                        <tr>
                            <th>NIF</th>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Viatura</th>
                            <th>Nr Intervenções</th>
                        </tr>
            `
            data.forEach(a => {
                html += `<tr>
                            <td>${a.nif}</td>
                            <td>${a.nome}</td>
                            <td>${a.data}</td>
                            <td>${a.viatura.marca} ${a.viatura.modelo}</td>
                            <td>${a.nr_intervencoes}</td>
                        </tr>`
            });
            html += '</table></body></html>'
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(html)
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end('<h1>Erro na obtenção dos dados: ' + error + '</h1>')
        }
    }
    else if (req.url == '/intervencoes') {
        try {
            const resp = await fetch('http://localhost:3000/reparacoes');
            const data = await resp.json();
            var intervencoes = {};

            data.forEach(rep => {
                rep.intervencoes.forEach(inte => {
                    if (!intervencoes[inte.codigo]) {
                        intervencoes[inte.codigo] = {
                            codigo: inte.codigo,
                            nome: inte.nome,
                            descricao: inte.descricao,
                            count: 1
                        };
                    } else {
                        intervencoes[inte.codigo].count++;
                    }
                });
            });

            var sortedIntervencoes = Object.values(intervencoes).sort((a, b) => a.codigo.localeCompare(b.codigo));

            var html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Intervenções</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h1>Lista de Intervenções</h1>
                    <table border="1">
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Quantidade</th>
                        </tr>
            `
            sortedIntervencoes.forEach(i => {
                html += `<tr>
                            <td>${i.codigo}</td>
                            <td>${i.nome}</td>
                            <td>${i.descricao}</td>
                            <td>${i.count}</td>
                        </tr>`
            });
            html += '</table></body></html>'
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(html)
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end('<h1>Erro na obtenção dos dados: ' + error + '</h1>')
        }
    }
    else if (req.url == '/viaturas') {
        try {
            const resp = await fetch('http://localhost:3000/reparacoes');
            const data = await resp.json();
            var viaturas = {};

            data.forEach(rep => {
                var key = rep.viatura.marca + ' ' + rep.viatura.modelo;
                if (!viaturas[key]) {
                    viaturas[key] = {
                        marca: rep.viatura.marca,
                        modelo: rep.viatura.modelo,
                        count: 1
                    };
                } else {
                    viaturas[key].count++;
                }
            });

            var sortedViaturas = Object.values(viaturas).sort((a, b) => a.marca.localeCompare(b.marca) || a.modelo.localeCompare(b.modelo));

            var html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Viaturas</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h1>Lista de Viaturas</h1>
                    <table border="1">
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Quantidade de Reparações</th>
                        </tr>
            `
            sortedViaturas.forEach(v => {
                html += `<tr>
                            <td>${v.marca}</td>
                            <td>${v.modelo}</td>
                            <td>${v.count}</td>
                        </tr>`
            });
            html += '</table></body></html>'
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(html)
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end('<h1>Erro na obtenção dos dados: ' + error + '</h1>')
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('<h1>Página não encontrada</h1><p><a href="/reparacoes">Reparações</a> | <a href="/intervencoes">Intervenções</a> | <a href="/viaturas">Viaturas</a></p>')
    }
}).listen(7777)

console.log('Servidor rodando na porta 7777')
