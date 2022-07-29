<script>
    export default {
       
        data(){
           return {

           }
        },
        props: ['token', 'currentUser'],
        computed: {
            workouts(){
               return this.$store.getters['workout/getWorkouts']
            }
        },
        methods: {
            async getWorkouts(){
                await this.$store.dispatch('workout/getWorkouts',{token:this.token, currentUser:this.currentUser})
            },
            async deleteWorkout(e){
                const workoutId = e.target.id
                await this.$store.dispatch('workout/deleteWorkout',{workoutId: workoutId,token: this.token, currentUser:this.currentUser})
                // this.$router.push('/')
            }
        },
        created(){
           this.getWorkouts()
           console.log(this.workouts)
        }
       
    }
</script>


<template>
     <ul>
     <li  v-for="workout in workouts.workouts" :key="workout.id" class="workout-details">
      <h4>{{workout.title}}</h4>
      <p><strong>Load (kg): </strong>{{workout.load}}</p>
      <p><strong>Number of reps: </strong>{{workout.reps}}</p>
      <p>{{workout.createdAt}}</p>
      <span :id="workout.id" @click="deleteWorkout">delete</span>
    </li>
    </ul>
 
</template>

<style>
    .workout-details {
    background: #fff;
    border-radius: 4px;
    margin: 20px auto;
    padding: 20px;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
    }
    .workout-details h4 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
    color: var(--primary);
    }
    .workout-details p {
    margin: 0;
    font-size: 0.9em;
    color: #555;
    }
    .workout-details span {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background: #f1f1f1;
    padding: 6px;
    border-radius: 50%;
    color: #333;
    }


</style>