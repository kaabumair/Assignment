const ValidateTask = (request, response, next) => {
    if(request.body && request.body.task && request.body.task.length <= 20)
        next();
    else
        response.status(400).json({
            "error": "The length of task must be less than 20"
        })
}

module.exports = ValidateTask;