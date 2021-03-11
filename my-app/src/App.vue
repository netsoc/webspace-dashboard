
<template>
  <div>
    <header>
      <Navbar />
    </header>

    <!-- Either show Login or CreateWebspace -->
    <div v-if="authToken.length === 0">
      <Login @login="onLogin" />
    </div>
    <div v-else>
      <CreateWebspace :auth-token="authToken" />

      <!-- Debug elements -->
      <br><br>
      <h2>Debug elements</h2>
      <p>{{ JSON.stringify(webspaceInfo) }}</p>
      <button @click="deleteWebspace">
        Delete Webspace
      </button>
      <button @click="logout">
        Logout
      </button>
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
      authToken: '',
      webspaceInfo: null
    }
  },

  methods: {

    onLogin ($event) {
      this.authToken = $event

      // Fetch the users current webspace, if they have one
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authentication': `Bearer ${this.authToken}`
        }
      }
      fetch(`${this.WEBSPACED_API_URL}/webspace/self`, requestOptions).then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            this.webspaceInfo = data
          })
        }
      })
    },

    // Temp API method
    logout () {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authentication': `Bearer ${this.authToken}`
        }
      }
      fetch(`${this.IAM_API_URL}/users/self/login`, requestOptions)
      this.authToken = ''
    },

    // Temp API method
    deleteWebspace () {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authentication': `Bearer ${this.authToken}`
        }
      }
      fetch(`${this.WEBSPACED_API_URL}/webspace/self`, requestOptions)
      this.webspaceInfo = null
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
