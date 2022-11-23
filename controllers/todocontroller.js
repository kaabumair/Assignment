const { arrayBuffer } = require('stream/consumers');
const pool = require('../dbConn')
const TodoRepo = require('../repository/todorepository')
const Basic_token = require('../middleware/basictoken')

class TodoController{
    async getAll(request, response) {
        const todoRepo = new TodoRepo();
        let res = await todoRepo.getAlltasks();
        response.json({
            todo : res.rows
        })
    }

    async createTask(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.createTaskRepo(request.body.task, request.body.done, request.body.description);

        response.json({
            "status" : "task created"
        })
    }

    async deleteTask(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.deleteTaskRepo(request.body.task)
        response.json({
            "status" : "task deleted"
        })
    }

    async UpdateTask(request,response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.Update(request.body.task, request.body.done, request.body.id)
        response.json({
            "status" : "task Updated"
        })
    }

    async UpdateDesc(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.UpdateDescription(request.body.description, request.body.id)
        response.json({
            "status" : "task's Description Updated"
        })

    }

    async TaskStatus(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.TS()

        response.json({
            "status" : "check console"
        })

        console.log(`${JSON.stringify(res.rows[0], '{}', 2)}`);

    }

    async BasicAuth(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.getBasicAuth(request.body.username, request.body.password);

        let string = JSON.stringify(res.rows, '{}', 2)
        let object = JSON.parse(string)

        console.log(object)
        let user_name = object[0].hasOwnProperty("username")
        let user = object[0].username;
        // console.log(user_name)
        // console.log(user)
        let pass = object[0].password;

        // for(let i=-0; i<object.length; I++){
        //     for(let j=i+1; j<object.length; j++){

        //         if(object[i].username == request.body.username && object[j] == request.body.password){
        //             response.send("Welcome to your site! " + user + "change the url to /create to create tasks")

        //         }

        //         else {
        //             response.send("Invalid username and password")


        //         }
                
        //     }
        // }

        const BT = new Basic_token()
        
        let token_result = await BT.generateToken(6)
        
        if(user == request.body.username && pass == request.body.password){
            response.send("Welcome to your site! " + user + "your token to create tasks is " + token_result)
            console.log("User logged in")
        }

        else {
            response.send("Invalid username and password")
            console.log("Invalid Login")
        }

    }


    async createUser(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.createnewuser(request.body.username, request.body.password);
            response.json({
                "status" : "New User Created"
            })
    }

    async deleteUser(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.deleteTaskRepo(request.body.id)
        response.json({
            "status" : "user deleted"
        })
    }

}

module.exports = TodoController