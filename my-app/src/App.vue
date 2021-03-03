<template>
  <img alt="Netsoc logo" src="./assets/netsoc-logo.png">
  <Webspaces/>
</template>

<script>
import Webspaces from './components/Webspaces.vue'

export default {
  name: 'App',
  components: {
    Webspaces
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
