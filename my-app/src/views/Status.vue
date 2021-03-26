<template>
  <div class="status">
    <h1>Webspaces State</h1>
    <!-- <div v-if="isRunning">
      <p>The container is now online</p>
    </div>
    <div v-else>
      <p>The container is now offline</p>
    </div> -->
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
    <div v-if="isRunning">
      NetworkInterfaces <br>
      {{ webspaceState.networkInterfaces }}
    </div>
    <button @click="startContainer">
      Start Container
    </button>
    <button @click="rebootContainer">
      Reboot
    </button>
    <button @click="shutDownContainer">
      Shut Down
    </button>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {

  name: 'ManageWebspaceStatus',

  data () {
    return {
      isRunning: false,
      // the webspace status
      webspaceState: {
        running: null,
        uptime: null,
        usage: null,
        networkInterfaces: {}
      }
    }
  },
  created () {
    this.fetchWebspacesState()
    this.checkContainer()
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
    },

    checkContainer () {
      if (this.webspaceState.networkInterfaces !== {}) {
        this.isRunning = true
      } else {
        this.isRunning = false
      }
    },

    async reGenerateWebspacesConfig () {

    },

    async startContainer () {
      try {
        this.startContainer = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'POST')
        // notification that the container has started
        alert('You have successfully start a webspace container.')
      } catch (err) {
        alert('Unable to start a webspace container. ' + err.message)
      }
      this.fetchWebspacesState()
      this.checkContainer()
    },

    async rebootContainer () {
      try {
        confirm('Are you sure you want to reboot the current container?')
        this.rebootContainer = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'PUT')
        // notification that the container has rebooted
        alert('You have successfully reboot a webspace container.')
      } catch (err) {
        alert('Unable to reboot the current webspace container. ' + err.message)
      }
      this.fetchWebspacesState()
    },

    async shutDownContainer () {
      try {
        confirm('Are you sure you want to shut down the current container?')
        this.shutDownContainer = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'DELETE')
        // notification that the container has deleted
        alert('You have successfully delete a webspace container.')
      } catch (err) {
        alert('Unable to delete the current webspace container. ' + err.message)
      }
      this.fetchWebspacesState()
    }
  }
}
</script>

<style>
.status {
  margin-top: 0px;
}

.status button {
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
</style>
