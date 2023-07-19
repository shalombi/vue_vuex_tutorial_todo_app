import userMsg from './user-msg.js'

export default {
    template: `
            <header>
                <user-msg></user-msg>
                <nav>
                    <router-link to="/">Home</router-link> 
                    <router-link to="/todos">Todos</router-link>
                </nav>
            </header>
    `,
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        // checkout() {
        //     this.$store.commit({ type: 'checkout' })
        // },
    },
    components: {
        userMsg,
    },
}
