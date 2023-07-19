import todoPreview from "./todo-preview.js"

export default {
    props: ["todos"],
    template: `
        <section class="list-todos">
             <ul v-for="todo in todos">
                 <todo-preview :todo="todo" />
                 <button @click="remove(todo._id)">x</button>
             </ul>
        </section>
    
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        remove(todoId) {
            this.$emit('remove', todoId)
        }
    },
    computed: {
    },
    components: {
        todoPreview
    }

}