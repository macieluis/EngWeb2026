# TP3 - Sistema de Gestão da Escola de Música

## Identificação
- **Data de Início:** 20 de Fevereiro de 2026
- **Data de Fim:** 20 de Fevereiro de 2026

## Resumo
Este trabalho consistiu no desenvolvimento de um serviço em Node.js para consumir e apresentar dados de alunos, cursos e instrumentos de uma Escola de Música, através do uso de um *dataset* em formato JSON (`db.json`).

A arquitetura implementada inclui:
1. Um servidor de dados (`json-server`) que disponibiliza a API REST na porta 3000.
2. Um servidor aplicacional em Node.js (porta 24000) que consome a API e gera páginas HTML dinamicamente através do processamento da informação recebida.

O servidor aplicacional processa os dados para criar listagens sobre a Escola de Música e efetua as chamadas à API JSON utilizando funcionalidades nativas do Node.js (`fetch` integrado em substituição ao clássico `axios`), garantindo a apresentação gráfica organizada através da framework CSS **w3.css**, tudo efetuado sem dependências de *packages* externas ou ficheiros de configuração (`package.json`).

## Lista de Resultados

As seguintes páginas foram implementadas e estão acessíveis no servidor aplicacional (porta 24000):

1. **[/alunos](http://localhost:24000/alunos)**: Tabela contendo listagem pormenorizada de todos os alunos registados na escola de música, detalhando os seus respetivos cursos matriculados e instrumentos.
2. **[/cursos](http://localhost:24000/cursos)**: Tabela demonstrativa detalhando a identificação, nomes, durações e pormenores dos variados cursos disponíveis na instituição.
3. **[/instrumentos](http://localhost:24000/instrumentos)**: Tabela discriminativa dos variados instrumentos integrados no sistema da escola.
