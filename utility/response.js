

const statusCodes = {
    success: 200,
    notFound:404,
    created: 201,
    serverError: 500,
    badRequest: 400
};


const responseObject = {
    'statusCode': 500,
    'success': false,
    'message':"",
    'data': {}
};

const logger = function(message){
    /// check if dev or live
    console.log(message)
};

const errorMessages = {
    'USER_NOT_FOUND': {
        message: "User not found",
        statusCode: statusCodes.notFound
    },
    'PROVIDE_REQUIRED_FIELDS': {
        message: "Please provide required fields ",
        statusCode: statusCodes.badRequest
    },
    'INCORRECT_PASSWORD': {
        message: "Incorrect password",
        statusCode: statusCodes.badRequest
    }
}

module.exports = {logger,responseObject,statusCodes,errorMessages};
