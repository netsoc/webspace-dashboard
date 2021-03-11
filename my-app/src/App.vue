
<template>
  <div>
    <!-- Navigation bar -->
    <header>
      <Navbar />
    </header>
    <!-- Either show Login or CreateWebspace -->
    <div v-if="authToken.length === 0">
      <Login @login="onLogin" />
    </div>
    <div v-else>
      <CreateWebspace :auth-token="authToken" />
    </div>
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
  },

  data () {
    return {
      authToken: ''
    }
  },

  methods: {
    onLogin ($event) {
      this.authToken = $event
      this.fetchWebspace()
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
