
<template>
  <div>
    <header>
      <Navbar />
    </header>
    <Login
      @login="AUTH_TOKEN = $event"
    />
    <CreateWebspace />
  </div>
</template>

<script>
import CreateWebspace from './components/CreateWebspace.vue'
import Navbar from './components/NavigationBar'
import Login from './components/Login.vue'

export default {

  name: 'App',

  components: {
    CreateWebspace,
    Navbar,
    Login
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box
}

header {
  width: 100vw;
  background-color:rgb(57, 0, 190);
  padding:25px;
}

body {
  padding: 10px;
  font-family: Segoe UI, sans-serif;
}

h2 {
  color: #0040d0;
  margin: 10px 20px 10px 0px;
}

h3 {
  color: #0040d0;
  margin: 20px 10px 10px 0px;
}

p {
  color: #0040d0;
}

select, input {
  background: transparent;
  color: #0040d0;
  font-weight: bold;
  border: 2px solid #0040d0;
  border-radius: 2px;
}
</style>
