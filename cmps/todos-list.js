import todoPreview from "./todo-preview.js"

export default {
    props: ["todos"],
    template: `
        <section class="list-todos">
             <ul v-for="todo in todos">
                 <todo-preview :todo="todo"/>
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

    },
    computed: {
    },
    components: {
        todoPreview
    }

}