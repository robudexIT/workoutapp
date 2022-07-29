export default {
    mutatateUser(state,payload){
        state.user = payload
    },
    mutateSignupStatus(state, payload){
        state.signupStatus = payload
       
    }
}