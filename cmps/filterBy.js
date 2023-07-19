
export default {
    template: `
    <section class="filterBy">
        <pre>{{ filterBy }}</pre>
        <form @submit.prevent="filter">

            <input 
            type="text" 
            v-model="filterBy.task"
            placeholder="filter.."
            @input = "filter"
            />

            <select @change="filter" v-model="filterBy.status">
               <!-- <option>  All </option> -->

               <option value ="all"> All </option>
               <option :value ="true"> done </option>
               <option :value ="false"> not done </option>
            </select>


            <button> filter </button>

        </form>

    </section>
    
    `,
    data() {
        return {
            filterBy: {
                task: '',
                status: null
            }
        }
    },
    created() {
    },
    methods: {
        filter() {
            // console.log(typeof this.filterBy.status)
            this.$store.commit({ type: 'setFilterBy', filterBy: this.filterBy })
        }
    },
    computed: {
    }

}