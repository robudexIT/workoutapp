<script>
  import WorkoutForm from '../components/WorkoutForm.vue'
  import WorkoutDetails from '../components/WorkoutDetails.vue'
  
  export default{
    components: {WorkoutForm, WorkoutDetails},
    data(){
        return {
            // workouts: [
            //     {title: 'PushUp',loads:'20KG', reps:100},
            //     {title: 'PushUp',loads:'20KG', reps:100},
            //     {title: 'PushUp',loads:'20KG', reps:100},
            //     {title: 'PushUp',loads:'20KG', reps:100}, 
            // ]   
        }
    },
    
  }
</script>

<template>
   <div class="home">
        <div class="workouts">
            <workout-details ></workout-details>
        </div>
    <workout-form></workout-form>
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