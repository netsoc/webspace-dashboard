<template>
  <div>
    <SideBar />
    <Login
      :token="token"
      @login="updateToken($event)"
    />
  </div>
</template>

<script>
import Login from './components/Login.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    Login,
    SideBar
  },

  data () {
    return {
      token: ''
    }
  },

  methods: {
    updateToken (newToken) {
      this.token = newToken
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
