<script>
    export default {
        data(){
            return {
                var: ''
            }
        }
    }
</script>

<template>
     
     <header class="container">
       
        <h1><router-link :to="'/'">Username Workout</router-link></h1>
     
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