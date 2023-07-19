
import { todoService } from '../services/todo.service.js'
import todosList from '../cmps/todos-list.js'

export default {
    template: `
        <section class="todo-app">
            <h1>Todos</h1>
            <router-link to="/todo/edit"> add </router-link>
            <!-- <pre>{{ todos }}</pre>  -->
            <todos-list :todos="todos" @remove="onRemoveTodo" @toggleIsDone="toggleIsDone"/>
        </section>
    `,
    data() {
        return {

        }
    },

    created() {
        // console.log()

    },
    computed: {
        // products(){
        //     return this.$store.state.products
        // }

        todos() {
            return this.$store.state.todos
        }
    },
    methods: {
        onRemoveTodo(todoId) {
            console.log('todoId:', todoId)
            this.$store.commit({ type: 'removeTodo', todoId })
        },
        toggleIsDone (todo){
            this.$store.commit({ type: 'toggleIsDone', todo })
        }

        // addToCart(product) {
        //     this.$store.commit({ type: 'addToCart', product })
        // },
        // addProduct() {
        //     console.log('Adding...', this.productToEdit)
        //     this.$store.commit({ type: 'addProduct', product: this.productToEdit })
        //     this.productToEdit  = productService.getEmptyProduct()
        // }
    },

    components: {
        todosList
    }
}
