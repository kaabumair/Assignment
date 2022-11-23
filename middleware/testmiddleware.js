require('dotenv').config()
const pool = require('../dbConn')
const Basic_token = require('../middleware/basictoken')
const TodoController = require('../controllers/todocontroller')

const todo = new TodoController()

const CheckBasicToken = (request, response, next) => {
    if(request.headers && request.headers['authorization'] && request.headers['authorization'].split(' ')[1] == request.body.token_result)
        next();
    else
        response.status(401).json({
            "error": "Invalid token"
        })
}

module.exports = CheckBasicToken;