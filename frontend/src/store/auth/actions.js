export default {
    // async signUpUser(context, payload){
    //     console.log(payload)
    //     try {
    //         const workout = await fetch('http://210.1.86.214:3000/signup', { 
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(payload)
    //         })
    //         if(workout.ok){
    //             context.commit('mutatateUser')
    //         }
    //     }catch(error){
    //         console.log(error)
    //     }
    // }, 
   async signinAndsignupUser (context, payload){
        
        const apiAddr = context.rootGetters.getApiEndpoint
        const username = payload.username
        const password = payload.password
        const option = payload.option // signin or signup

        const data = await fetch(`${apiAddr}/${option}`,{
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
       
        if(!data.ok){
            const error = new Error('Error in access this endpoint')
            throw error
        }
        const user = await data.json()
        if(!user[option]){
            throw user.message
        }
        if(option === 'signin'){
            //save to localstorage and commit
           context.dispatch('updateUserState', user)
        }else {
          //dispatch signup success status
          
          context.dispatch('signupSucess', true)
        }
       
   } ,
   signupSucess(context, payload){
    
    context.commit('mutateSignupStatus', payload) //payload is true or false
   },
   checkIfCurrentIsLogin(context){
    const data = {}
    data.token = localStorage.getItem('token')
    data.username = localStorage.getItem('currentUser')
    context.commit('mutatateUser', data)
   },

   updateUserState(context,payload){
     localStorage.setItem('token', payload.token)
     localStorage.setItem('currentUser', payload.username)
     context.commit('mutatateUser', payload)
   },
   async signoutUser(context, payload){
      const apiAddr = context.rootGetters.getApiEndpoint
      const data = await fetch(`${apiAddr}/signout`, {
        method:'GET',
        headers: {
            'Authorization': `Bearer ${payload.token}`,
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
        }
      })
      if(!data.ok){
        const error = new Error('Error in accessing this endpoint')
        throw error
      }
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
     
      
   }

}