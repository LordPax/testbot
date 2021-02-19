const request = require('request')
require('dotenv').config()

const { ACCESS_TOKEN } = process.env

const handleMessage = (sender_psid, received_msg) => {
    let response
    if (received_msg.text) {
        response = {
            text : `tu a evoyer : "${received_msg.text}". Now send me an image!`
        }
    }
    else if (received_msg.attachments) {
        response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "c'est la bonne image ?",
                        subtitle: "click pour répondre.",
                        image_url: received_msg.attachments[0].payload.url,
                        buttons: [{
                            type: "postback",
                            title: "Oui!",
                            payload: "oui",
                        },
                        {
                            type: "postback",
                            title: "Non!",
                            payload: "non",
                        }],
                    }]
                }
            }
        }
    }

    callSendAPI(sender_psid, response)
}

const handlePostback = (sender_psid, received_postback) => {
    let response
    const { payload } = received_postback

    if (payload === 'oui')
        response = { text : 'Merci' }
    else if (payload === 'non')
        response = { text : 'nan tu mens' }
    
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