
export default {
    template: `
    <section class="filterBy">
        <pre>{{ filterBy }}</pre>
        <form @submit.prevent="filter">

            <input 
            type="text" 
            v-model="filterBy.task"
            placeholder="filter.."
            />

            <button> filter </button>

        </form>

    </section>
    
    `,
    data() {
        return {
            filterBy: {
                task: ''
            }
        }
    },
    created() {
    },
    methods: {
        filter(){
            this.$store.commit({ type: 'setFilterBy', filterBy:this.filterBy })
        }
    },
    computed: {
    }

}