exports.storage = {
    USERS: [],
    TODOS:[],
    MESSAGES:[],

    getUsers: function(){
        return JSON.stringify(this.USERS)
    }
}
