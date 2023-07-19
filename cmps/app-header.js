// import userMsg from './user-msg.js'

export default {
    template: `
            <header>
                <!-- <user-msg></user-msg> -->
                <nav>
                    <router-link to="/">Home</router-link> |
                    <router-link to="/todo">Todos</router-link> |
                    <router-link to="/user">Profile</router-link>
                </nav>
               <!-- <pre> {{user}}</pre> -->
               <h3>Hello {{ user.fullName }}</h3>
            </header>
    `,
    data() {
        return {
        }
    },
    computed: {
        user (){
            return this.$store.state.user
        }
    },
    methods: {
        // checkout() {
        //     this.$store.commit({ type: 'checkout' })
        // },
    },
    components: {
        // userMsg,
    },
}
