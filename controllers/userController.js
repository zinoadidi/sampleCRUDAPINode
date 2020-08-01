const {UserModel, UserObject} = require("../models/userModel");
const {statusCodes, logger, errorMessages} =   require('../utility/response')
const {badRequest, serverError, success, notFound, created } = statusCodes
const crypto = require('crypto')


exports.register = async function(data){
  let response = {}
  try {

      if (!data.hasOwnProperty('email') || !data.hasOwnProperty('name')  ||
          !data.hasOwnProperty('location') || !data.hasOwnProperty('password') ) {
          throw new Error("Please provide required fields ")
      }

      if (data.password!=null && data.password.length <4 ) {
      throw new Error("Password must be more than 4 digits ")
    }

    if(findUserByEmail(data.email)){
      throw new Error("User already exists")
    }

    let newUser = addUserToDb(data)
    response.statusCode = created
    response.message = newUser.name + " Created Successfully"
    response.data = removeSensitiveFields(newUser)
    
  }catch(ex){
      response.statusCode = badRequest
      response.message =  ex.message
      response.data = null
      logger(ex)
  }

  return response
}

exports.getAllUsers = async function(){
    console.table(database.USERS)

  let response = {}

  try {
    const allUsers = JSON.parse(database.getUsers())

    response.statusCode = success
    response.message = "Users Retrieved Successfully"

    response.data = allUsers.filter(user =>removeSensitiveFields(user));

  }catch(ex){
      response.statusCode = badRequest
      response.message =  ex.message
      response.data = null
      logger(ex)
  }
  return response
}

exports.getUserByUniqueID = async function(data){
    let response = {}
    try {
    let id = data.id;
    let userData = findUserByEmail(id) ? findUserByEmail(id) : findUserById(id);

    if (!userData){
        throw new Error("USER_NOT_FOUND")
    }
    response.statusCode = success
    response.message = "Users Retrieved Successfully"
    response.data = removeSensitiveFields(userData)
    }catch(ex){
      let errorMessage = errorMessages[ex.message];
      response.statusCode = errorMessage.statusCode || badRequest
      response.message =  errorMessage.message || ex.message
      response.data = null
      logger(ex)
    }

    return response
}

exports.authenticate = async function(data){
    let response = {}

    try {
        let userData = findUserByEmail(data.email);

        if (!userData){
            response.statusCode = 404;
            throw new Error("USER_NOT_FOUND")
        }

        if (userData.password !== hashPassword(data.password)){
            throw new Error("INCORRECT_PASSWORD")
        }

        response.statusCode = success
        response.message = "Login Successfully"
        response.data = removeSensitiveFields(userData)
    }catch(ex){
        response.message =  ex.message
        response.data = null
        logger(ex)
    }

    return response
}

exports.updateUser = async function(data){
    let response = {}
    try {

        if (!data.hasOwnProperty('email') || !data.hasOwnProperty('name')  ||
            !data.hasOwnProperty('location') ) {
            throw new Error("PROVIDE_REQUIRED_FIELDS")
        }
        if(!findUserByEmail(data.email)){
            throw new Error("USER_NOT_FOUND")
        }

        data = removeSensitiveFields(data)
        const updatedUser = database.USERS.filter((user)=>{
            if(user.id === data.id){
                user.name = data.name
                user.phone = data.phone
                user.about =  data.about
                user.location = data.location
                user.image = data.image
                user.updated_at = new Date().toISOString()
                return user;
            }
        })

        response.statusCode = success
        response.message = "Updated Successful"
        response.data = removeSensitiveFields({...updatedUser[0]})

    }catch(ex){
        let errorMessage = errorMessages[ex.message];
        response.statusCode = errorMessage.statusCode || badRequest
        response.message =  errorMessage.message || ex.message
        response.data = null
        logger(ex)
    }

    return response
}

function findUserById(id) {
    let users = JSON.parse(database.getUsers());
    return users.find(user => user.id === id)
}

function findUserByEmail(email) {
    let users = JSON.parse(database.getUsers());
    return users.find(user => user.email === email)
}

function addUserToDb(user){
    user.password = hashPassword(user.password);
    user = new UserModel(user).user;
    database.USERS.push(user)
    return {...user}
}

const removeSensitiveFields = function(ret){
  let newObject
    try {
    newObject = ret.toObject(
        false,
        false
    )
  }catch(ex){
    newObject = ret
  }
  
  delete newObject.password
  return newObject
}

const hashPassword = function(password){
    try{
        let salt = "randomValue";
        return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha512').toString('hex');
    }catch(ex){
        return ex
    }
};
