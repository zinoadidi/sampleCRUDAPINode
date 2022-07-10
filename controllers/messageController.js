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
            
            if (criteria.hasOwnProperty('isGroupMessage')) {
                messages = findMessageByRecieverId(criteria.receiver)
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


const findMessageByRecieverId = function (recieverId) {
    let message = JSON.parse(database.getMessage());
    return message.filter(message => message.receiver === recieverId)
}

const findMessageByUserId = function (userId) {
    let message = JSON.parse(database.getMessage());
    return message.filter(message => message.sender === userId || message.receiver === userId)
}

const findMessageByPairIds =function(firstUserId, secondUserId) {
    let message = JSON.parse(database.getMessage());
    return message.filter(message => 
    (message.sender === firstUserId || message.receiver === firstUserId) ||
    (message.sender === secondUserId || message.receiver === secondUserId)
    )
}

const addMessageToDb = function(message){
    message = new MessageModel(message).message;
    database.MESSAGES.push(message)
    return {...message}
}

