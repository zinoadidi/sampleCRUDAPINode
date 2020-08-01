const uniqid = require("uniqid");

const MessageObject = {
    sender: String,
    receiver: String,
    message: String,
    id: String
}

class MessageModel{

    constructor(message) {
        this._message = {
            id:uniqid(),
            ...message,
            created_at: new Date().toISOString()
        };
    }

    get message() {
        return this._message;
    }
}
module.exports = {
   MessageObject, MessageModel
};

