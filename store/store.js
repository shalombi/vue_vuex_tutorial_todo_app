import { showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'

const { createStore } = Vuex

const storeOptions = {
  strict: true,
  state() {
    return {
      todos: null,
      filterBy: {
        task: '',
        status: null
      },
      user: userService.getLoggedinUser()
    }
  },
  mutations: {
    setTodos(state, { todos }) {
      console.log('todos from DB:', todos)
      state.todos = todos
    },

    saveTodo(state, { todo }) {
      todoService.save(todo)

      if (todo._id) {
        let newTodos = [...state.todos]
        newTodos = newTodos.map(t => t._id !== todo._id ? t : todo)
        state.todos = [...newTodos]
      }
      else {
        state.todos.push(todo)
      }
    },
    removeTodo(state, { todoId }) {
      console.log('todoId from store:', todoId)
      const idx = state.todos.findIndex(todo => todo._id === todoId)
      state.todos.splice(idx, 1)

      todoService.remove(todoId)
    },
    removeTodo(state, { todoId }) {
      console.log('todoId from store:', todoId)
      const idx = state.todos.findIndex(todo => todo._id === todoId)
      state.todos.splice(idx, 1)

      todoService.remove(todoId)
    },


    toggleIsDone(state, { todo }) {
      const newTodo = { ...todo, isDone: !todo.isDone }
      let newTodos = [...state.todos]
      newTodos = newTodos.map(t => t._id !== newTodo._id ? t : newTodo)
      state.todos = [...newTodos]
    },

    setFilterBy(state, { filterBy }) {
      state.filterBy = { ...filterBy }
      console.log('filterBy:', filterBy)
      state.todos = todoService.query(filterBy)
    },

    updateUsername(state, { fullName }) {
      console.log(fullName)
      const updatedName = userService.updateUserName(fullName)
      state.user.fullName = updatedName
    }

  },
  getters: {
    todos(state) {
      console.log('todos fromm getters:', state.todos)
      return state.todos
    }
  },
  actions: {
    loadTodos(context) {
      return todoService.query()
        .then(todos => {
          context.commit({ type: 'setTodos', todos })
          return todos
        })
        .catch(err => {
          console.log('Cannot load todos', err)
          throw err
        })

    },
  }
}

export const store = createStore(storeOptions)


store.subscribe(function (cmd, state) {
  console.log('**** Store state changed: ****')
  console.log('Command:', cmd.payload)
  console.log('storeState:\n', state)
  console.log('*******************************')
})