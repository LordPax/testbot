const app = require('express').Router()
require('dotenv').config()

app.post('/webhook', (req, res) => {
    const { object, entry } = req.body

    if (object === 'page') {
        entry.forEach(elem => {
            const webhook_event = elem.messaging[0]
            console.log(webhook_event)
        })
        res.status(200).send('EVENT_RECEIVED')
    }
    else
        res.sendStatus(404)
})

app.get('/webhook', (req, res) => {
    const { VERIFY_TOKEN } = process.env

    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED')
            res.status(200).send(challenge)
        }
        else
            res.sendStatus(403)
    }
})

module.exports = app