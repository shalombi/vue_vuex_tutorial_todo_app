import { todoService } from "../services/todo.service.js"

export default {
    template: `
        <section class="todo-edit">
            todo edit

            <form @submit.prevent = "save">
                <input
                type="text" 
                placeholder="task.." 
                v-model = "todo.task"
                />

            </form>

          <pre> {{ todo }}</pre>  
        </section>
    
    `,
    data() {
        return {
            todo: todoService.getEmptyTodo()
        }
    },
    created() {
    },
    methods: {
        save() {
            console.log('save')
            this.$store.commit({ type: 'saveTodo', todo: this.todo })
        }

    },
    computed: {
    }

}