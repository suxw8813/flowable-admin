<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    window.addEventListener("beforeunload",()=>{
        //console.log("mmm")
        //console.info(this.$store.state.user);
        //sessionStorage.setItem("loginInfo", JSON.stringify(this.$store.state.user))
    })
    var user = JSON.parse(sessionStorage.getItem("loginInfo"))
    if(user) {
      this.$store.commit('updataUser', user)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
