<script>
    export default {
        data(){
            return {
                var: ''
            }
        },
        computed: {
            currentUser(){
             return this.$store.getters['auth/getUser'].username
             },
            token(){
                return this.$store.getters['auth/getUser'].token
            },
           
        },
       create(){
            this.$store.dispatch('auth/checkIfCurrentIsLogin')
       }
    }
</script>

<template>
     
     <header class="container">
       
        <h1><router-link :to="'/'">{{currentUser}} Workout</router-link></h1>
     
     </header>
</template>

<style>
header {
  background: #fff;
}
header .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header a {
  color: #333;
  text-decoration: none;
}

</style>