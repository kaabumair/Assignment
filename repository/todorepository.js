const pool = require('../dbConn')

class TodoRepo {

    async getAlltasks() {
        return await pool.query('select * from public.todolist')
    }

    async createTaskRepo(task, done, description) {
        return await pool.query('INSERT INTO public.todoList (task,done,description) VALUES($1,$2,$3)'
        , [task, done, description]);
    }

    async deleteTaskRepo(task){
       return await pool.query('delete from public.todolist where task = $1', [task])
    }

    async Update(task,done,id){
        return await pool.query('Update public.todoList SET task = $1, done = $2 where id = $3', [task, done, id])

    }
    
    async UpdateDescription(description, id){
        return await pool.query('Update public.todoList SET description = $1 where id = $2', [description, id])
    }

    async TS(){
        let result = await pool.query(`select count(*) as total,
        count(done) filter (where done = 'true') as Done,
        count(done) filter (where done = 'false') as Pending
        from public.todolist `)

        return result;

    }

    async getBasicAuth(username, password) {
        return await pool.query('select * from public.accounts where username = $1 and password = $2', [username, password])
    }

    
    async createnewuser(username, password) {
        return await pool.query('INSERT INTO public.accounts (username, password) VALUES($1,$2)'
        , [username, password]);
    }

    async deleteuserfromdatabase(id){
        return await pool.query('delete from public.accounts where id = $1', [id])
     }
}

module.exports = TodoRepo;