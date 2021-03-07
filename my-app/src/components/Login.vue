
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
      const requestOptions = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'password': this.password })
      }
      const response = await fetch(`${this.API_URL}/users/${this.username}/login`, requestOptions)
      const data = await response.json()
      // TODO: verify login was successful
      this.$emit('login', data.token)
    }
  }

}
</script>

<style>
</style>
