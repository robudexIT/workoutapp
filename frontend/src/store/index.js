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
            //  apiAddr: 'http://localhost:3000' // for backend is also on local
            //   apiAddr: 'http://210.1.86.214:3000' // backend is on another server/domain. cookie cannot send/recieve via http it securet https (connection)
            
             apiAddr: 'https://n2xfnt3nml.execute-api.us-east-1.amazonaws.com/latest' // aws api-gateway endpoint  act as a proxy for backend to allow sending and recieve cookie 
        }
    },
    getters:{
        getApiEndpoint(state){
            return state.apiAddr
        }
    }
})

export default store