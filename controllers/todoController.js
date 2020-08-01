const messageModel = require('../database/messageDB');
module.exports = {
    sendMessage: async(data) => {
        try {
            const message = await messageModel.create(data);
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
            return {
                status: 500,
                message: 'Error Ocurred',
                data: error
            }
        }
    },
    getMessage: async (criteria) => {
        try {
            const messages = await messageModel.find(criteria);

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