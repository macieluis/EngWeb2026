# TPC6 - App sobre Cinema Americano

## Identificação
- **Data de Início:** 16 de Março de 2026
- **Data de Fim:** 17 de Março de 2026

## Resumo
Este trabalho consistiu no desenvolvimento de uma aplicação web sobre cinema americano, orquestrada com Docker Compose, composta por três serviços:

1. **MongoDB** — Base de dados com 3 coleções: `filmes`, `atores` e `generos`, importadas automaticamente a partir do dataset `cinema.json`.
2. **API de dados** (Express + Mongoose, porta 7789) — API REST minimalista com operações CRUD sobre as 3 coleções.
3. **Interface web** (Express + Pug, porta 7792) — Servidor aplicacional que consome a API e gera páginas HTML dinamicamente.

O dataset original foi pré-processado por um script (`setup.js`) que:
- Separa os dados em 3 coleções distintas (filmes, atores e géneros)
- Filtra entradas inválidas no campo `cast` (sinopses, descrições e nomes de bandas misturados com nomes de atores)

## Lista de Resultados

As seguintes páginas foram implementadas e estão acessíveis na interface web (porta 7792):

1. **[/filmes](http://localhost:7792/filmes)**: Tabela com id, título, ano, número de atores no elenco e número de géneros. Cada linha é um link para a página individual do filme.
2. **[/filmes/:id](http://localhost:7792/filmes/F1)**: Página com toda a informação do filme (id, título, ano, géneros e cast).
3. **[/atores](http://localhost:7792/atores)**: Tabela com id, nome e número de filmes em que participou. Cada linha é um link para a página individual do ator.
4. **[/atores/:id](http://localhost:7792/atores/A1)**: Página com toda a informação do ator (id, nome e lista de filmes com links).
5. **[/generos](http://localhost:7792/generos)**: Tabela com id, designação e número de filmes associados ao género.

## Como Executar

```bash
# Gerar as 3 coleções a partir do dataset (só necessário se alterar cinema.json)
cd api_dados && node setup.js && cd ..

# Construir e lançar todos os serviços
docker compose up --build
```

A aplicação fica disponível em [http://localhost:7792](http://localhost:7792).
