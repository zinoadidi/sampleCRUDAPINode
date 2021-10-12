const {MessageModel, MessageObject} = require("../models/messageModel");

module.exports = {
    sendMessage: async(data) => {
        try {
            const message = addMessageToDb(data);
            if (!message){
                return {
                    message: 'Message creation failed',
                    status: 400,
                    data: null,
                }
            }
            return {
                message: 'Message created successfully',
                status: 201,
                data: message
            }

        } catch (error) {
            console.log(error)
            return {
                status: 500,
                message: 'Error Ocurred',
                data: error
            }
        }
    },
    getMessage: async (criteria) => {
        console.table(database.MESSAGES)
        try {
            let messages = [];
            if (criteria.hasOwnProperty('sender') && criteria.hasOwnProperty('receiver')) {
                messages = findMessageByPairIds(criteria.sender, criteria.receiver)
            }

            if (criteria.hasOwnProperty('userId')) {
                messages = findMessageByUserId(criteria.userId)
            }

            return {
                status: 200,
                message: "Message retrieved successfully",
                data: messages
              }
        } catch (err) {
            return {
                message: 'Error Ocurred',
                status: 500,
                data: err,
            }
        }
    }
}


const findMessageByUserId = function (userId) {
    let message = JSON.parse(database.getMessage());
    return message.find(message => message.sender === userId || message.receiver === userId)
}

const findMessageByPairIds =function(firstUserId, secondUserId) {
    let message = JSON.parse(database.getMessage());
    let messageList = message
    return messageList;
}

const addMessageToDb = function(message){
    message = new MessageModel(message).message;
    database.MESSAGES.push(message)
    return {...message}
}

