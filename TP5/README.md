# TPC5 - Sistema de Gestão de Cinema

## Identificação
- **Data de Inicio:** 9 de Marco de 2026
- **Data de Fim:** 9 de Marco de 2026

## Resumo
Este trabalho consistiu no desenvolvimento de uma aplicacao web em Node.js para consumir e apresentar dados de um dataset de cinema (filmes e atores), utilizando um *dataset* em formato JSON.

A arquitetura implementada inclui:
1. Um servidor de dados (`json-server`) que disponibiliza a API REST na porta 3001.
2. Um servidor aplicacional em Express (porta 3008) que consome a API e gera paginas HTML dinamicamente atraves de templates **Pug**.

O dataset original (`cinema.json`) e preprocessado pelo script `setup.js` que gera o ficheiro `db.json` com colecoes de filmes (com IDs) e atores (extraidos dos casts dos filmes).

## Lista de Resultados

As seguintes paginas foram implementadas e estao acessiveis no servidor aplicacional (porta 3008):

1. **[/](http://localhost:3008/)** ou **[/filmes](http://localhost:3008/filmes)**: Tabela com a listagem de todos os filmes, com id, titulo, ano, numero de generos e numero de atores.
2. **[/filmes/:id](http://localhost:3008/filmes/1)**: Ficha completa de um filme, com todos os campos (titulo, ano, generos, cast).
3. **[/atores](http://localhost:3008/atores)**: Tabela com a listagem de todos os atores, com id, nome e numero de filmes.
4. **[/atores/:id](http://localhost:3008/atores/1)**: Ficha completa de um ator, com a lista dos seus filmes (com links).

## Como Executar

```bash
# Preprocessar o dataset (apenas na primeira vez)
node setup.js

# Terminal 1 — servidor de dados (json-server)
json-server --watch db.json --port 3001

# Terminal 2 — instalar dependencias e iniciar servidor aplicacional
npm install
npm start
```
