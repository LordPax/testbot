const request = require('request')
const { match } = require('./utils')
require('dotenv').config()

const { ACCESS_TOKEN } = process.env

const handleMessage = (sender_psid, received_msg) => {
    let response

    if (received_msg.text === 'Comment vas-tu ?') {
        response = {
            text : 'Très bien et vous ?',
            quick_replies :  [{
                content_type : 'text',
                title : 'Je vais bien merci',
                payload : 'good'
            },
            {
                content_type : 'text',
                title : 'Non, ça ne va pas',
                payload : 'notgood'
            }]
        }
    }
    else if (received_msg.attachments) {
        response = {
            text : 'Je ne sais pas traier ce type de demande'
        }
    }
    else {
        response = {
            text : received_msg.text
        }
    }

    callSendAPI(sender_psid, response)
}

const handlePostback = (sender_psid, received_postback) => {
    const { payload } = received_postback

    const response = {}
    
    callSendAPI(sender_psid, response)
}

const callSendAPI = (sender_psid, response) => {
    const request_body = {
        recipient : {
            id : sender_psid
        },
        message : response
    }

    request({
        uri : 'https://graph.facebook.com/v2.6/me/messages',
        qs : { access_token : ACCESS_TOKEN },
        method : 'POST',
        json : request_body
    })
}

module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI
}