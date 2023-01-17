const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const drugs = require('./drugs')

app.get('/drugs/:id', (req, res) => {
    const drugId = req.params.id
    drugs.getDrug(drugId)
        .then((drug) => {
            if (drug) {
                res.status(200).json(drug)
            } else {
                res.status(404).send('Drug not found')
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

app.get('/drugs', (req, res) => {
    drugs.getDrugs()
        .then((drugs) => {
            res.status(200).json(drugs)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

app.post('/drugs', (req, res) => {
    const drugData = req.body
    drugs.createDrug(drugData)
        .then(() => {
            res.status(201).send('Drug created')
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

app.put('/drugs/:id', (req, res) => {
    const drugId = req.params.id
    const updatedDrug = req.body
    drugs.updateDrug(drugId, updatedDrug)
        .then(() => {
            res.status(200).send('Drug updated')
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

app.delete('/drugs/:id', (req, res) => {
    const drugId = req.params.id
    drugs.deleteDrug(drugId)
        .then(() => {
            res.status(200).send('Drug deleted')
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

//server 
app.listen(3000, () => {
    console.log('API listening on port 3000!')
})