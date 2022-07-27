import { createStore }  from 'vuex'

import workoutModules from './workout/index.js'

const store = createStore({
    modules: {
        workout:workoutModules
    },
    state(){
        return {
            fromMainStore: ''
        }
    }
})

export default store