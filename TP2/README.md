# TPC2 - Sistema de Gestão de Reparações

## Identificação
- **Data de Início:** 13 de Fevereiro de 2026
- **Data de Fim:** 13 de Fevereiro de 2026

## Resumo
Este trabalho consistiu no desenvolvimento de um serviço em Node.js para consumir e apresentar dados de reparações de veículos.

A arquitetura implementada inclui:
1. Um servidor de dados (`json-server`) que disponibiliza a API REST na porta 3000.
2. Um servidor aplicacional em Node.js (porta 7777) que consome a API e gera páginas HTML estáticas.

O servidor aplicacional processa os dados para criar listagens agregadas de intervenções e viaturas, sem utilizar dependências externas (`axios` substituído por `fetch` nativo) e sem folhas de estilo complexas, conforme solicitado.

## Lista de Resultados

As seguintes páginas foram implementadas e estão acessíveis no servidor (porta 7777):

1. **[/reparacoes](http://localhost:7777/reparacoes)**: Lista todas as reparações registadas com detalhes (NIF, Nome, Viatura).
2. **[/intervencoes](http://localhost:7777/intervencoes)**: Lista os tipos de intervenção únicos e a quantidade de vezes que foram realizados.
3. **[/viaturas](http://localhost:7777/viaturas)**: Lista as viaturas intervencionadas (Marca/Modelo) e o número total de reparações por modelo.
