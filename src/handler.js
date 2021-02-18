const request = require('request')
require('dotenv').config()

const { ACCESS_TOKEN } = process.env

const handleMessage = (sender_psid, received_msg) => {
    let response
    if (received_msg.text) {
        response = {
            "text" : `You sent the message: "${received_msg.text}". Now send me an image!`
        }
    }
    callSendAPI(sender_psid, response)
}

const handlePostback = (sender_psid, received_postback) => {

}

const callSendAPI = (sender_psid, response) => {
    const request_body = {
        "recipient" : {
            "id" : sender_psid
        },
        "message" : response
    }

    request({
        "uri" : 'https://graph.facebook.com/v2.6/me/messages',
        "qs" : { "access_token" : ACCESS_TOKEN },
        "method" : 'POST',
        "json" : request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    })
}

module.exports = {
    handleMessage,
    handlePostback,
    callSendAPI
}