export default {
   
   async signinAndsignupUser (context, payload){   
        const apiAddr = context.rootGetters.getApiEndpoint
        const username = payload.username
        const password = payload.password
        const option = payload.option // signin or signup
        console.log(payload)
        const data = await fetch(`${apiAddr}/${option}`,{
            method: 'POST',
            //  mode: 'cors',
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
   async checkIfCurrentIsLogin(context){
    
    const userState = {}
    userState.username = localStorage.getItem('currentUser')
    userState.token = localStorage.getItem('token')
    userState.expires = localStorage.getItem('expires')
    if(!userState.username || !userState.token || !userState.expires){
      return
    }
    if(userState.expires < new Date(Date.now)){
      const apiAddr = context.rootGetters.getApiEndpoint
      const token =  await context.dispatch('fetchUserToken', apiAddr)
       
      const user = await token.json()
      context.dispatch('updateUserState', user)
      return
     }
     context.dispatch('updateUserState', userState) 
    
  },
   updateUserState(context,payload){
        localStorage.setItem('token', payload.token)
        localStorage.setItem('currentUser', payload.username)
        localStorage.setItem('expires', payload.expires)
        context.commit('mutatateUser', payload)
   },
   async fetchUserToken(context, apiAddr){
    const token =  await fetch(`${apiAddr}/tokens`,{method:'GET', credentials: 'include'})
    if(!token.ok){
        const error = new Error('Cannot get accessToken')
        throw error 
     }
     return token
  },
   async signoutUser(context, payload){
      const apiAddr = context.rootGetters.getApiEndpoint
      const token = await fetch(`${apiAddr}/tokens`, {
                      method: 'GET',
                      credentials: 'include',
                    })
      if(!token.ok){
        const error = new Error('Cannot provide access token')
        throw error
      }
       const user = await token.json()

      
      const data = await fetch(`${apiAddr}/signout`, {
        method:'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${user.token}`,
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
       localStorage.removeItem('expires')

      context.commit('mutatateUser', {})
      
   }

}