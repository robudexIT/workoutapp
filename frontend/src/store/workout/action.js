export default {
    async getWorkouts(context,payload){
        const apiAddr = context.rootGetters.getApiEndpoint
        console.log(context)
        try {
            const data = await fetch(`${apiAddr}/getworkouts`,{
                method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${payload.token}`,
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    }
                
            })
            if(workouts.ok){
                const workouts = await data.json()
                context.commit('getWorkouts', data)
                context.dispatch('auth/updateUserState',{username:workouts.username, token:workouts.token})
            }
        }catch(error){
            console.log(error)
        }
    },
    async addWorkout(context, payload){
        const apiAddr = context.rootGetters.getApiEndpoint
        console.log(payload)
        try {
            const data = await fetch(`${apiAddr}/workout`, { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${payload.token}`,
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if(data.ok){
                const workout = await data.json()
                context.dispatch('getWorkouts',workout)
                context.dispatch('auth/updateUserState',{username:workout.username, token:workout.token})
            }
        }catch(error){
            console.log(error)
        }
    },
    async deleteWorkout(context,payload){
        const workoutId = payload.workoutId
        const apiAddr = context.rootGetters.getApiEndpoint
        try {
            const data = await fetch(`${apiAddr}/${workoutId}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${payload.token}`,
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                },
            })
           if(data.ok){
            const deleteWorkout = data.json()
            context.dispatch('auth/updateUserState',{username:deleteWorkout.username, token:deleteWorkout.token})
             context.dispatch('getWorkouts')
            
           }

        }catch(error){
            console.log(error)
        }
    }
}