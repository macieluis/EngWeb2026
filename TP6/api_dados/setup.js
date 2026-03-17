const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('../cinema.json', 'utf8'))

// Filter: valid actor name - starts with uppercase, max 4 words,
// and most words are capitalized (allowing particles like de, la, van, der, von, di, el, al)
function validName(name) {
  if (!name || name.length < 2) return false
  const trimmed = name.trim()
  if (!/^[A-Z]/.test(trimmed)) return false
  const words = trimmed.split(/\s+/)
  if (words.length > 5) return false
  const particles = new Set(['de', 'la', 'van', 'der', 'von', 'di', 'el', 'al', 'del', 'dos', 'das', 'du', 'le', 'da'])
  const lowerWords = words.filter(w => /^[a-z]/.test(w) && !particles.has(w))
  if (lowerWords.length > 0) return false
  // Reject entries that are just abbreviations (e.g. "U.S.", "Sr.") or contain years
  if (words.length === 1 && /^[A-Z]\.?[A-Z]?\.?$/.test(trimmed)) return false
  if (trimmed === 'Sr.' || trimmed === 'Jr.') return false
  if (/^(The|A|An) [0-9]/.test(trimmed)) return false
  if (/^Baja /.test(trimmed)) return false
  // Reject band/title names: "A/The + 2+ capitalized words"
  if (/^(A|The|An) /.test(trimmed) && words.length >= 3) return false
  return true
}

const filmes = raw.filmes.map((f, i) => ({
  _id: `F${i + 1}`,
  title: f.title,
  year: f.year,
  cast: (f.cast || []).filter(validName),
  genres: f.genres || []
}))

// Extract unique actors
const actorMap = {}
filmes.forEach(f => {
  f.cast.forEach(actor => {
    if (!actorMap[actor]) {
      actorMap[actor] = { name: actor, films: [] }
    }
    actorMap[actor].films.push({ _id: f._id, title: f.title, year: f.year })
  })
})

const atores = Object.values(actorMap).map((a, i) => ({
  _id: `A${i + 1}`,
  name: a.name,
  films: a.films
}))

// Extract unique genres
const genreMap = {}
filmes.forEach(f => {
  f.genres.forEach(g => {
    if (!genreMap[g]) {
      genreMap[g] = { name: g, films: [] }
    }
    genreMap[g].films.push({ _id: f._id, title: f.title, year: f.year })
  })
})

const generos = Object.values(genreMap).map((g, i) => ({
  _id: `G${i + 1}`,
  name: g.name,
  films: g.films
}))

fs.writeFileSync('./filmes.json', JSON.stringify(filmes, null, 2))
fs.writeFileSync('./atores.json', JSON.stringify(atores, null, 2))
fs.writeFileSync('./generos.json', JSON.stringify(generos, null, 2))

console.log(`Processados: ${filmes.length} filmes, ${atores.length} atores, ${generos.length} géneros.`)
