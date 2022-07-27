export default {
    async getWorkouts(context){
        try {
            const workouts = await fetch('http://localhost:3000/getworkouts')
            if(workouts.ok){
                const data = await workouts.json()
                context.commit('getWorkouts', data)
            }
        }catch(error){
            console.log(error)
        }
    },
    async addWorkout(context, payload){
        console.log(payload)
        try {
            const workout = await fetch('http://localhost:3000/workout', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if(workout.ok){
                context.dispatch('getWorkouts')
            }
        }catch(error){
            console.log(error)
        }
    },
    async deleteWorkout(context,payload){
        const workoutId = payload.workoutId
        try {
            const deleteResponse = await fetch(`http://localhost:3000/workout/${workoutId}`,{
                method: 'DELETE'
            })
           if(deleteResponse.ok){
             context.dispatch('getWorkouts')
           }

        }catch(error){
            console.log(error)
        }
    }
}