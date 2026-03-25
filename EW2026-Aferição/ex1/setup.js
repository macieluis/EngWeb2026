const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('../dataset_reparacoes.json', 'utf8'))

const reparacoes = raw.reparacoes

// Verificar e corrigir nr_intervencoes para corresponder ao array real
reparacoes.forEach(r => {
  r.nr_intervencoes = r.intervencoes.length
})

fs.writeFileSync('./repairs.json', JSON.stringify(reparacoes, null, 2))

console.log(`Processadas ${reparacoes.length} reparações.`)
