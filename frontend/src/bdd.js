const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5173

// initialisation
app.use(bodyParser.json())

const cardsDB = []
const collectionsDB = []

// creation d'une carte
app.post('/card', (req, res) => {
  const { tokenId, name, img } = req.body
  if (!tokenId || !name || !img) {
    return res.status(400).json({ error: 'Il manque un champ !' })
  }

  const tmp = cardsDB.find(c => c.tokenId === tokenId)
  if (tmp) {
    return res.status(409).json({ error: 'La carte existe déjà !' })
  }

  cardsDB.push({ tokenId, name, img })
  res.status(201).json({ message: 'Carte ajoutee !' })
})

// Recuperer une carte par son tokenId
app.get('/card/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const card = cardsDB.find(c => c.tokenId === id)

  if (!card) {
    return res.status(404).json({ error: 'Carte non trouvee !' })
  }

  res.status(200).json(card)
})

// Creer une collection
app.post('/collection', (req, res) => {
  const { tokenId, name, carte } = req.body

  if (!tokenId || !name || !carte) {
    return res.status(400).json({ error: 'Il manque un champ !' })
  }

  const tmp = collectionsDB.find(c => c.tokenId === tokenId)
  if (tmp) {
    return res.status(409).json({ error: 'La collection existe déjà !' })
  }

  collectionsDB.push({ tokenId, name, carte })
  res.status(201).json({ message: 'Collection creee !' })
})

// Recuperer une collection par son tokenId
app.get('/collection/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const collection = collectionsDB.find(c => c.tokenId === id)

  if (!collection) {
    return res.status(404).json({ error: 'Collection non trouvee.' })
  }

  res.status(200).json(collection)
})

// Ajouter une carte à une collection
app.post('/collection/card/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const card = cardsDB.find(c => c.tokenId === id)

  if (!card) {
    return res.status(404).json({ error: 'Carte non trouvee !' })
  }

  const collection = collectionsDB.find(c => c.tokenId === id)
  if (!collection) {
    return res.status(404).json({ error: 'Collection non trouvee !' })
  }

  const tmp = collection.carte.find(c => c.tokenId === id)
  if (tmp) {
    return res.status(409).json({ error: 'La carte existe déjà !' })
  }

  collection.carte.push(card)
  res
    .status(200)
    .json({ message: 'Carte ajoutee à la collection avec succes.' })
})

app.listen(port, () => {
  console.log(`Serveur Express en cours d'execution sur le port ${port}`)
})
