# Manifesto: TP1 - Análise e Visualização de Dataset de Oficina

**Data:** 5 de Fevereiro de 2026
**Autor:** [Luís Maciel / a106896]
**Unidade Curricular:** Engenharia Web

## Resumo
Este projeto consistiu na análise de um dataset em formato JSON (`dataset_reparacoes.json`) que contém registos de intervenções realizadas numa oficina automóvel. O objetivo principal foi o desenvolvimento de um script em Python capaz de processar estes dados e gerar automaticamente um website estático para a sua exploração.

## Funcionalidades e Estrutura do Website
O website gerado segue a estrutura hierárquica solicitada no enunciado:

1.  **Página Principal (`index.html`)**: Ponto de entrada com links para as listagens principais.
2.  **Listagem de Reparações**: Tabela com a data, NIF, nome do cliente, viatura e número de intervenções por registo.
3.  **Tipos de Intervenção**: Lista alfabética de códigos de intervenção, permitindo navegar para o detalhe de cada uma.
4.  **Marcas e Modelos**: Listagem ordenada de veículos intervencionados com contagem de ocorrências.
5.  **Páginas de Detalhe**:
    * **Reparação**: Informação completa de uma intervenção específica.
    * **Tipo de Intervenção**: Dados do código/nome e a lista de todas as reparações onde foi aplicado.
    * **Marca/Modelo**: Histórico de reparações para cada combinação de marca e modelo.

## Implementação Técnica
O script `gera_oficina.py` foi desenvolvido em Python e utiliza apenas bibliotecas padrão (`json`, `os`, `shutil`), garantindo portabilidade. A lógica de processamento foca-se em:
* **Indexação**: O dataset é percorrido para criar índices em memória (dicionários) para Marcas e Intervenções, permitindo o cruzamento de dados exigido.
* **Geração Estática**: Uso de f-strings para templates HTML, garantindo que o site é totalmente navegável offline através de links relativos.

## Como Executar
1. Colocar o ficheiro `dataset_reparacoes.json` na mesma pasta que o script.
2. Executar o comando:
   ```bash
   python3 gera_oficina.py