<template>
  <form v-on:submit.prevent="login">
  <label for="username">Username:</label>
  <input type="text" v-model="username"><br><br>
  <label for="password">Password:</label>
  <input type="password" v-model="password"><br><br>
  <input type="submit" value="Submit">
</form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      JWT: ""
    }
  },
  methods: {
    async login() {
      const requestOptions = {
        method: "POST",
        headers: { "accept": "application/json",
                   "Content-Type": "application/json" },
        body: JSON.stringify({ "password": this.password })
      }
      const response = await fetch(`https://iam.netsoc.ie/v1/users/${this.username}/login`, requestOptions)
      const data = await response.json()
      this.JWT = data.token
      console.log(this.JWT)
    }
  }
}
</script>
