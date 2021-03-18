
<template>
  <div>
    <header>
      <Navbar />
    </header>
    <div v-if="isLoggedIn">
      <CreateWebspace />
      <WebspaceConfiguration />
    </div>
    <div v-else>
      <Login @login="isLoggedIn = true" />
    </div>
  </div>
</template>

<script>
import CreateWebspace from './components/CreateWebspace.vue'
import Navbar from './components/NavigationBar'
import Login from './components/Login.vue'
import WebspaceConfiguration from './components/WebspaceConfiguration'

export default {

  name: 'App',

  components: {
    CreateWebspace,
    Navbar,
    Login,
    WebspaceConfiguration
  },

  data () {
    return {
      isLoggedIn: false
    }
  }
}

</script>

<style>
:root {
  /* Global CSS Variables */
  --text-primary-color: #0040d0;
  --text-font-family: "Segoe UI", sans-serif;
  --background-primary-color: #ffffff;
}

* {
  /* Remove default element margins */
  padding: 0;
  margin: 0;
}

header {
  width: 100vw;
  background-color:rgb(57, 0, 190);
  padding:25px;
}

body {
  /* Default background color */
  background-color: var(--background-primary-color);
}

/* Default text styling */
h1, h2, h3, p {
  font-family: var(--text-font-family);
  color: var(--text-primary-color);
}

/* Default input styling */
select, input {
  background: transparent;
  font-family: var(--text-font-family);
  color: var(--text-primary-color);
  border: 2px solid #0040d0;
  border-radius: 2px;
}
</style>
