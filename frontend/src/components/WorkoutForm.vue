<script>
    export default {
        data(){
            return {
                title: '',
                load: '',
                reps: ''
            }

        },
        props: ['token','currentUser'],
        methods: { 
            addWorkout(){
                const data = {
                    title: this.title,
                    load: this.load,
                    reps: this.reps,
                    currentUser:this.currentUser
                }
                this.$store.dispatch('workout/addWorkout', data)
                this.title = ''
                this.load = ''
                this.reps = ''
                this.$router.push('/')
            },
           
            
        }
    }
</script>


<template>
    <form>
         <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input type="text"  v-model="title"/>

      <label>Load (in kg):</label>
      <input type="text" v-model="load"/>

      <label>Number of Reps:</label>
      <input 
        type="number" v-model="reps" />

      <button @click.prevent="addWorkout">Add Workout</button>
      
    </form>
</template>


<style>
        /* layout */
    :root {
    --primary: #1aac83;
    --error: #e7195a;
    }
    /* new workout form */
    label, input {
    display: block;
    }
    input {
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    }
    form button {
    background: var(--primary);
    border: 0;
    color: black;
    padding: 10px;
    font-family: "Poppins";
    border-radius: 4px;
    cursor: pointer;
    }
    div.error {
    padding: 10px;
    background: #ffefef;
    border: 1px solid var(--error);
    color: var(--error);
    border-radius: 4px;
    margin: 20px 0;
    }
    input.error {
    border: 1px solid var(--error);
    }
</style>