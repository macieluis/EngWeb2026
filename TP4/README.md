# TPC4 - Sistema de Gestão de Exames Médicos Desportivos

## Identificação
- **Data de Início:** 1 de Março de 2026
- **Data de Fim:** 1 de Março de 2026

## Resumo
Este trabalho consistiu no desenvolvimento de um serviço em Node.js para consumir e apresentar dados de Exames Médicos Desportivos (EMD), através do uso de um *dataset* em formato JSON (`emd_convertido.json`).

A arquitetura implementada inclui:
1. Um servidor de dados (`json-server`) que disponibiliza a API REST na porta 3000.
2. Um servidor aplicacional em Node.js (porta 7777) que consome a API e gera páginas HTML dinamicamente através de templates **Pug**.

O servidor aplicacional implementa o ciclo CRUD completo sobre os registos EMD, utilizando `axios` para as chamadas à API REST e a framework CSS **w3.css** para a apresentação gráfica. As views são renderizadas com o motor de templates **Pug**, garantindo uma separação clara entre lógica e apresentação.

## Lista de Resultados

As seguintes páginas foram implementadas e estão acessíveis no servidor aplicacional (porta 7777):

1. **[/emd](http://localhost:7777/emd)**: Tabela com a listagem de todos os EMDs registados, com opções de ordenação por data e por nome.
2. **[/emd/:id](http://localhost:7777/emd)**: Página de detalhe de um registo EMD, com todos os campos disponíveis e opções de edição e eliminação.
3. **[/emd/registo](http://localhost:7777/emd/registo)**: Formulário para inserir um novo registo EMD.
4. **[/emd/edit/:id](http://localhost:7777/emd)**: Formulário de edição de um registo EMD existente.
5. **[/emd/delete/:id](http://localhost:7777/emd)**: Rota para eliminar um registo e redirecionar para a listagem.
6. **[/emd/stats](http://localhost:7777/emd/stats)**: Página de estatísticas com contagens por género, modalidade, clube, resultado e estado de federado.

## Como Executar

```bash
# Terminal 1 — servidor de dados (json-server)
npx json-server --watch emd_convertido.json --port 3000

# Terminal 2 — servidor aplicacional
node emd_server.js
```
