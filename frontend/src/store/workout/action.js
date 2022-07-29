export default {
    async getWorkouts(context,payload){
        const apiAddr = context.rootGetters.getApiEndpoint
        try {
            const workouts = await fetch(`${apiAddr}/getworkouts`,{
                method: 'GET',
                headers: {
                    headers: {
                        'Authorization': `Bearer ${payload.token}`,
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    }
                }
            })
            if(workouts.ok){
                const data = await workouts.json()
                context.commit('getWorkouts', data)
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
            }
        }catch(error){
            console.log(error)
        }
    },
    async deleteWorkout(context,payload){
        const workoutId = payload.workoutId
        const apiAddr = context.rootGetters.getApiEndpoint
        try {
            const deleteResponse = await fetch(`${apiAddr}/${workoutId}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${payload.token}`,
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                },
            })
           if(deleteResponse.ok){
             context.dispatch('getWorkouts')
           }

        }catch(error){
            console.log(error)
        }
    }
}