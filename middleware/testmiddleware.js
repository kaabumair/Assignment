require('dotenv').config()
const pool = require('../dbConn')
const TodoController = require('../controllers/todocontroller')

const todo = new TodoController()
const CheckBasicToken = (request, response, next) => {
     // Getting the set Headers


    //let token = Buffer.from([request.body.username, request.body.password]).toString('base64')
    if(request.headers && request.headers['authorization'] && request.headers['authorization'].split(' ')[1] == request.headers['token'])
        next();
    else
        response.status(401).json({
            "error": "Invalid token"
        })
}

module.exports = CheckBasicToken;