// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex


import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo
}

var gTodos = _createTodos()

async function query(filterBy) {

    // var todos = utilService.loadFromStorage(KEY)
    var todos = await storageService.query(KEY)

    // console.log(todos)
    // return
    
    if (!todos || !todos.length) {
        todos = JSON.parse(JSON.stringify(gTodos))
        utilService.saveToStorage(KEY, todos)
    }

    if (filterBy) {
        const regex = new RegExp(filterBy.task, 'i')
        if (filterBy.task) todos = todos.filter(todo => regex.test(todo.task))

        if (filterBy.status && typeof filterBy.status !== 'string') {
            todos = todos.filter((todo) => !todo.isDone)
        } else if (filterBy.status === false) {
            todos = todos.filter((todo) => todo.isDone)
        } else {
            todos = todos
        }
    }

    return todos
}

function getById(id) {
    return gTodos.find(todo => todo._id === id)
}

function remove(id) {
    const idx = gTodos.findIndex(todo => todo._id === id)
    gTodos.splice(idx, 1)
    utilService.saveToStorage(KEY, gTodos)
}

function save(todo) {
    const todoToSave = JSON.parse(JSON.stringify(todo))
    const savedTodo = (todoToSave._id) ? _update(todoToSave) : _add(todoToSave)

    utilService.saveToStorage(KEY, gTodos)
    return savedTodo
}


function _add(todo) {
    todo._id = utilService.makeId()
    gTodos.push(todo)
    return todo
}

function _update(todo) {
    const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
    gTodos.splice(idx, 1, todo)
    return todo
}

function getEmptyTodo() {
    return {
        _id: '',
        task: '',
        isDone: false
    }
}

function _createTodos() {
    var todos = utilService.loadFromStorage(KEY)
    if (!todos || !todos.length) {
        todos = [_createTodo('wash the dishes'), _createTodo('throw the garbege'), _createTodo('Be happy')]
        utilService.saveToStorage(KEY, todos)
    }
    return todos
}

function _createTodo(task) {
    return {
        _id: utilService.makeId(),
        task,
        isDone: utilService.getRandomIntInclusive(0, 100) > 50 ? false : true
    }
}

