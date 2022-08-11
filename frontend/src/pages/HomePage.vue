<script>
  import WorkoutForm from '../components/WorkoutForm.vue'
  import WorkoutDetails from '../components/WorkoutDetails.vue'
  
  export default{
    components: {WorkoutForm, WorkoutDetails},
    data(){
        return {
           
        }
    },
    computed: {
        currentUser(){
            return this.$store.getters['auth/getUser'].username
        },
        token(){
            return this.$store.getters['auth/getUser'].token
        },
        hasUser(){
            return this.currentUser && this.token ? 'Logout' : 'Login'
        }
    },
    created(){
        
    },
    mounted(){
        this.$store.dispatch('auth/checkIfCurrentIsLogin')
        
    }
  }
</script>

<template>

   <div class="home">
        
        <div class="workouts">
            <workout-details  v-if="currentUser && token" :currentUser="currentUser" ></workout-details>
        </div>
        <workout-form v-if="currentUser && token" :currentUser="currentUser" ></workout-form>
   </div>
</template>


<style>
        /* homepage */
    .home {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 100px;
    }

    

</style>