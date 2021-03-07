
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
:root {
  --text-primary-color: #0040d0;
  --text-font-family: "Segoe UI", sans-serif;
  --background-primary-color: #ffffff;
}

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
  background-color: var(--background-primary-color);
  padding: 10px;
}

h1, h2, h3, p {
  font-family: var(--text-font-family);
  color: var(--text-primary-color);
}

select, input {
  background: transparent;
  font-family: var(--text-font-family);
  color: var(--text-primary-color);
  border: 2px solid #0040d0;
  border-radius: 2px;
}
</style>
