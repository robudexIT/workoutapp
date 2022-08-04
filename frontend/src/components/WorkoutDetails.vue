<script>
    export default {
       
        data(){
           return {

           }
        },
        props: ['currentUser'],
        computed: {
            workouts(){
               try{
                    return this.$store.getters['workout/getWorkouts']
               } 
               catch(error){
                console.log(error)
               }
            }
        },
        methods: {
            async getWorkouts(){
                try{
                    await this.$store.dispatch('workout/getWorkouts',{currentUser:this.currentUser})
            
                }catch(error){
                    console.log(error)
                }
            },  
            async deleteWorkout(e){
                try{
                    const workoutId = e.target.id
                    await this.$store.dispatch('workout/deleteWorkout',{workoutId: workoutId, currentUser:this.currentUser})
                    // this.$router.push('/')
                }catch(error){
                    console.log(error)
                }
               
            }
        },
        created(){
            if(this.currentUser){
                this.getWorkouts()
            }
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