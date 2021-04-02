<template>
  <div class="login">
    <h1>Login</h1>
    <br>
    <!--
      TODO (Ted): There was a problem with the <form> tag making multiple
      calls to login(). I've removed it for now but now the user can click
      Login even if they haven't filled in any of the text fields.
    -->
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
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  name: 'Login',
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
        this.$router.push('account')
      } catch (err) {
        // TODO: show an error in HTML instead
        alert('Unable to login: ' + err.message)
      }
    }
  }
}
</script>

<style>
.login {
  margin-top: 170px;
}
.login h1 {
  font-size: 40px;
  font-weight:normal;
  margin-right: 80px;
}
.login label {
  margin-right: 100px;
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
  margin-top: 5px;
  font-size: 10px;
}
.login-forgot-password a{
  font-size: 10px;
  text-decoration: underline;
  margin-left: 100px;
}
.login-forgot-password a:hover{
  color: #3f41e6;
}
.login-register {
  font-size: 12px;
  margin-left: 118px;
  margin-top: 5px;
}
.login-register a{
  font-size: 10px;
  text-decoration: underline;
}
.login-register a:hover{
  color: #3f41e6;
}
</style>
