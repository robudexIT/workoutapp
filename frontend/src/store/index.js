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
            apiAddr: 'http://210.1.86.214:3000'
        }
    },
    getters:{
        getApiEndpoint(state){
            return state.apiAddr
        }
    }
})

export default store