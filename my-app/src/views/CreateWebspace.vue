<template>
  <div class="login">
    <h1>Login</h1>
    <br>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <br>
      <input
        v-model="username"
        type="text"
      ><br><br>
      <label for="password">Password:</label>
      <br>
      <input
        v-model="password"
        type="password"
      >
      <br>
      <div class="login-forgot-password">
        <a href="#">Forgot your password?</a>
      </div>
      <br>
      <button @click="login">
        Login
      </button>
      <div class="login-register">
        <a href="#">Or register here</a>
      </div>
    </form>
  </div>
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
.login {
  margin-top: 150px;
  margin-left: 0px;
}
.login h1 {
  font-size: 40px;
  font-weight:normal;
}
.login label {
  font-size: 16px;
}
.login a {
  font-size: 8px;
}
.login button {
  background-color: #0055FF; /* Green */
  border: none;
  color: white;
  padding: 5px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 100px;
}
.login-forgot-password {
  font-size: 10px;
}
.login-forgot-password a{
  font-size: 10px;
  text-decoration: underline;
}
.login-forgot-password a:hover{
  color: #3f41e6;
}
.login-register {
  font-size: 12px;
  margin-left: 118px;
}
.login-register a{
  font-size: 10px;
  text-decoration: underline;
}
.login-register a:hover{
  color: #3f41e6;
}
</style>