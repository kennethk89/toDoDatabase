const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'todos',
        user: '',
        password: ''
    }
})
const bookshelf = require('bookshelf')(knex)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const Todo = bookshelf.Model.extend({
    tableName: 'list',
})

app.post('/add', (req, res) => {
    let newToDo = new Todo({
        todo: req.body.toDos,
        status: req.body.status
    })
    newToDo.save()
        .then((newToDo) => {
            res.json(newToDo.attributes)
        })
})

app.get('/', (req, res) => {
    Todo.fetchAll()
        .then(todos => {
            res.json(todos.models.map(todo => todo.attributes))
        })
})

app.post('/update', (req, res) => {
    let updatedTasks = {
        status: req.body.status
    }
    Todo.where({ id: req.body.id })
        .save(updatedTasks, { patch: true })
        .then((todo) => {
            Todo.fetchAll()
                .then(todos => {
                    let newTodos = todos.models.map(todo => todo.attributes)
                    res.json(newTodos)
                })
        })
})

app.get('/clear', (req, res) => {
    Todo.where({ status: true })
        .destroy()
        .then((todo) => {
            Todo.fetchAll()
                .then(todos => {
                    res.json(todos.models.map(todo => todo.attributes))
                })
        })
})

app.listen(8080)