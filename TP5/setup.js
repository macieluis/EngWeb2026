const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('./cinema.json', 'utf8'))

// Add IDs to films
const filmes = raw.filmes.map((f, i) => ({
  id: i + 1,
  title: f.title,
  year: f.year,
  cast: f.cast || [],
  genres: f.genres || []
}))

// Extract actors
const actorMap = {}
filmes.forEach(f => {
  f.cast.forEach(actor => {
    if (!actorMap[actor]) {
      actorMap[actor] = { name: actor, films: [] }
    }
    actorMap[actor].films.push({ id: f.id, title: f.title, year: f.year })
  })
})

const atores = Object.values(actorMap).map((a, i) => ({
  id: i + 1,
  name: a.name,
  films: a.films
}))

const db = { filmes, atores }
fs.writeFileSync('./db.json', JSON.stringify(db, null, 2))
console.log(`Processados ${filmes.length} filmes e ${atores.length} atores.`)
