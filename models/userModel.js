const uniqid = require("uniqid");

const UserObject = {
    name: String,
    location: String,
    phone: String,
    image: String,
    email: String,
    password: String,
    last_login: Date,
    updated_at: Date,
    created_at: Date,
    status: "Active",
    about: String
};

const message = {
    sender: String,
    receiver: String,
    message: String,
    id: String
}

class UserModel{

    constructor(user) {
        this._user = {
            id:uniqid(),
            ...user,
            last_login: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            status: "Active",
        };
    }

    get user() {
        return this._user;
    }
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
   UserObject, UserModel, MessageModel
};

