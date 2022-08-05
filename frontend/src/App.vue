<script >
   import NavBar from './components/NavBar.vue'
   import SigninSignout from './components/SigninSignout.vue'
   import TheSignup from './components/TheSignup.vue'
   export default {
     components: { NavBar, SigninSignout, TheSignup },

     methods: { 
       
     },
     created(){
        console.log('Getting cookie')
        console.log(document.cookie)
     }
   }
</script>

<template>
   <div class="pages">
      <div class='login_container'>
        <div>
             <signin-signout> </signin-signout>
        </div>
         <div>
            <the-signup></the-signup>
         </div>
      </div>
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
.login_container {
   display: flex;

}
.login_container  > div {
  margin: 2px;
  padding: 2px;
  font-size: 30px;
}
</style>