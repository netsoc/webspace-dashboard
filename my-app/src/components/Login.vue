
<template>
  <form @submit.prevent="login">
    <label for="username">Username:</label>
    <input
      v-model="username"
      type="text"
    ><br><br>
    <label for="password">Password:</label>
    <input
      v-model="password"
      type="password"
    ><br><br>
    <input
      type="submit"
      value="Submit"
    >
  </form>
</template>

<script>
import * as API from '@/API.js'

export default {

  name: 'Login',
  emits: ['login'],

  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async login () {
      try {
        const body = { 'password': this.password }
        const data = await API.fetch(`${API.IAM_API_URL}/users/${this.username}/login`, 'POST', body)
        API.setToken(data.token)
        // Example login successful resolution
        this.$emit('login')
      } catch (err) {
        // Example login failure resolution
        alert('Unable to login: ' + err.message)
      }
    }
  }

}
</script>

<style>
</style>
