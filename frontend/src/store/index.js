import { createStore }  from 'vuex'

import workoutModules from './workout/index.js'
import authModules from './auth/index.js'

const store = createStore({
    modules: {
        workout:workoutModules,
        auth: authModules
    },
    state(){
        return {
            fromMainStore: '',
            // apiAddr: 'http://localhost:3000'
            //  apiAddr: 'http://210.1.86.214:3000'
            //  apiAddr:'http://ec2-54-213-10-154.us-west-2.compute.amazonaws.com:3000'
            apiAddr: 'https://4cvpevlkn5.execute-api.us-west-2.amazonaws.com/dev'
        }
    },
    getters:{
        getApiEndpoint(state){
            return state.apiAddr
        }
    }
})

export default store