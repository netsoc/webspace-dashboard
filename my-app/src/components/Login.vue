
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

  data () {
    return {
      username: '',
      password: '',
      token: ''
    }
  },

  methods: {
    async login () {
      const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json',
          'Content-Type': 'application/json' },
        body: JSON.stringify({ 'password': this.password })
      }
      const response = await fetch(`https://iam.netsoc.ie/v1/users/${this.username}/login`, requestOptions)
      const data = await response.json()
      this.token = data.token
      this.$emit('login', this.token)
    }
  }

}
</script>

<style>
</style>
