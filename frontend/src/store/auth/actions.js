export default {
   
   async signinAndsignupUser (context, payload){
        
        const apiAddr = context.rootGetters.getApiEndpoint
        const username = payload.username
        const password = payload.password
        const option = payload.option // signin or signup

        const data = await fetch(`${apiAddr}/${option}`,{
            method: 'POST',
            // mode: 'no-cors',
            credentials: 'include',
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
          console.log('Signin access')
        }else {
          //dispatch signup success status
          
          context.dispatch('signupSucess', true)
        }
       
   } ,
   signupSucess(context, payload){
    
    context.commit('mutateSignupStatus', payload) //payload is true or false
   },
   checkIfCurrentIsLogin(context){
    const user = context.state.user
    if(user.expires > Date.now()){
      context.commit('mutatateUser', data)
      return
    }
    context.commit('mutatateUser',{})

  },

   updateUserState(context,payload){
    //  localStorage.setItem('token', payload.token)
    //  localStorage.setItem('currentUser', payload.username)
     context.commit('mutatateUser', payload)
   },
   async signoutUser(context, payload){
      const apiAddr = context.rootGetters.getApiEndpoint
      const token = await fetch(`{apiAddr}/tokens`, {
                      method: 'GET',
                      credentials: 'include',
                    })
      if(!token.ok){
        const error = new Error('Cannot provide access token')
        throw error
      }
       const accessToken = await token.json()

      
      const data = await fetch(`${apiAddr}/signout`, {
        method:'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${accessToken.token}`,
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
        }
      })
      if(!data.ok){
        const error = new Error('Error in accessing this endpoint')
        throw error
      }

      // localStorage.removeItem('token')
      // localStorage.removeItem('currentUser')
      context.commit('mutatateUser', {})
      
   }

}