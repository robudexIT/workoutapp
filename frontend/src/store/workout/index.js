import mutations from './mutations.js'
import actions from './action.js'
import getters from './getters.js'


export default {
    namespaced: true,
    state() {
        return {
            // workouts: [
            //     {title: 'PushUp',loads:'20KG', reps:100},
            //     {title: 'PushUp',loads:'20KG', reps:100},
            //     {title: 'PushUp',loads:'20KG', reps:100},
            //     {title: 'PushUp',loads:'20KG', reps:100}, 
            // ]  
            workouts: ''
        }
    },
    mutations,
    actions,
    getters
}