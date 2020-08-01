exports.storage = {
    USERS: [],
    TODOS:[],
    MESSAGES:[],

    getUsers: function(){
        return JSON.stringify(this.USERS)
    },
    getMessage: function(){
        return JSON.stringify(this.MESSAGES)
    }
}
