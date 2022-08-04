export default {
    async getWorkouts(context,payload){
        const apiAddr = context.rootGetters.getApiEndpoint
        console.log(context) 
            const token  = await fetch(`${apiAddr}/tokens`,{method:'GET'})
            if(!token.ok){
               const error = new Error('Cannot get accessToken')
               throw error 
            }
            const accessToken = await token.json()

            const data = await fetch(`${apiAddr}/getworkouts`,{
                method: 'GET',
                credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken.token}`,
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                    }
                
            })
            if(!data.ok){
                const error = new Error('Cannot get Workouts')
                throw error
                
            }
            const workouts = await data.json()
            context.commit('getWorkouts', workouts)
            // context.dispatch('auth/updateUserState',{username:workouts.username, token:workouts.token},{root:true})
    },
    async addWorkout(context, payload){
        const apiAddr = context.rootGetters.getApiEndpoint
        const token  = await fetch(`${apiAddr}/tokens`,{method:'GET'})
        if(!token.ok){
           const error = new Error('Cannot get accessToken')
           throw error 
        }
        const accessToken = await token.json()
            const data = await fetch(`${apiAddr}/workout`, { 
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if(!data.ok){
               const error = new Error('Cannot add workout') 
               throw error
            }
            const workout = await data.json()
            context.dispatch('getWorkouts',workout)
    },
    async deleteWorkout(context,payload){
        const workoutId = payload.workoutId
        const apiAddr = context.rootGetters.getApiEndpoint
        if(!token.ok){
            const error = new Error('Cannot get accessToken')
            throw error 
         }
         const accessToken = await token.json()
         const data = await fetch(`${apiAddr}/workout/${workoutId}`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                },
            })
            console.log(data)
           if(!data.ok){
              const error = new Error('Cannot Delete workout')
              throw error
           }
           const deleteWorkout = await data.json()
           console.log(deleteWorkout)
           context.dispatch('getWorkouts',{username:deleteWorkout.username})
          
    }
}