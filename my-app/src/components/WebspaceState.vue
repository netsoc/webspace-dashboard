
<template>
  <div>
    <h1>Webspaces State</h1>
    <br>
    Running <br>
    {{ webspaceState.running }}
    <br>
    Uptime <br>
    {{ webspaceState.uptime }}
    <br>
    Usage <br>
    {{ webspaceState.usage }}
    <br>
    NetworkInterfaces <br>
    {{ webspaceState.networkInterfaces }}
  </div>
</template>

<script>
import * as API from '@/API.js'

export default {

  name: 'WebspaceState',

  data () {
    return {
      isLoading: true,
      // New webspace configuration
      webspaceState: {
        running: null,
        uptime: null,
        usage: null,
        networkInterfaces: {
          eth0: null,
          address: null
        }
      }
    }
  },

  // Fetchs the available images when this view is created
  created () {
    this.fetchWebspacesState()
  },

  methods: {

    async fetchWebspacesState () {
      this.isLoading = true
      try {
        this.webspaceState = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'GET')
        console.log(this.webspaceState)
      } catch (err) {
        alert('Unable to find webspace state data: ' + err.message)
      }
      this.isLoading = false
    }

  }
}
</script>
