import { showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'

const { createStore } = Vuex

const storeOptions = {
  strict: true,
  state() {
    return {
      todos: todoService.query() || '',
      filterBy: {
        task: '',
        status: null
      },
      user: userService.getLoggedinUser()
    }
  },
  mutations: {

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
    
    // changeCount(state, { val }) {
    //   state.count += val
    // },
    // addToCart(state, payload) {
    //   state.cart.push(payload.product)
    // },
    // removeFromCart(state, { productId }) {
    //   const idx = state.cart.findIndex((product) => product._id === productId)
    //   state.cart.splice(idx, 1)
    // },
    // addProduct({ products }, { product }) {
    //   const newProduct = productService.save(product)
    //   products.push(newProduct)
    // },
    // checkout(state) {
    //   const cartTotal = state.cart.reduce((acc, prd) => acc + prd.price, 0)
    //   if (cartTotal > state.user.balance) {
    //     showErrorMsg('Not enough money...')
    //     return
    //   }
    //   const order = {
    //     _id: utilService.makeId(),
    //     createdAt: Date.now(),
    //     items: state.cart,
    //     total: cartTotal,
    //     status: 'pending',
    //   }
    //   userService.addOrder(order)

    //   state.user.orders.unshift(order)
    //   state.user.balance -= cartTotal
    //   state.cart = []
    // },
    // changeOrderStatus(state, { orderId, status }) {
    //   userService.changeOrderStatus(orderId, status)
    //   const order = state.user.orders.find((order) => order._id === orderId)
    //   order.status = status
    // },
    // deposit(state, { amount }) {
    //   userService.updateBalance(amount)
    //   state.user.balance += amount
    // },
  },
  getters: {
    // cartTotal({ cart }) {
    //   return cart.reduce((acc, prd) => acc + prd.price, 0)
    // },
  },
}

export const store = createStore(storeOptions)


store.subscribe(function (cmd, state) {
  console.log('**** Store state changed: ****')
  console.log('Command:', cmd.payload)
  console.log('storeState:\n', state)
  console.log('*******************************')
})