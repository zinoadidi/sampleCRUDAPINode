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
module.exports = {
   UserObject, UserModel
};

