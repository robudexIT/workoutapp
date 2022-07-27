<script >
   import NavBar from './components/NavBar.vue'
   export default {
     components: { NavBar },

   }
</script>

<template>
   <div class="pages">
      <nav-bar></nav-bar>
      <div class="routeclass">
        <router-view></router-view>
      </div>
    </div>
</template>

<style >
  /* google font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&family=VT323&display=swap');

.pages{
  max-width: 1400px;
  padding: 20px;
  margin: 0 auto;
}
</style>