
import { todoService } from '../services/todo.service.js'
import todosList from '../cmps/todos-list.js'

export default {
    template: `
        <section class="todo-app">
            <h1>Todos</h1>
            <!-- <pre>{{ todos }}</pre>  -->
            <todos-list :todos="todos"/>
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
