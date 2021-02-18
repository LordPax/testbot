const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const webhook = require('./src/webhook')

const { PORT } = process.env

app.use(bodyParser.json())
app.use(webhook)

app.listen(PORT || 1337, () => console.log('Ecoute le port', PORT, '...'))