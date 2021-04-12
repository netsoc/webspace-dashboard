<template>
  <div>
    <div class="consoleLogTitle">
      <p>Console Log</p>
    </div>
    <h3 class="content">Click here to clea Webspace Console Log</h3>
    <div class="buttons">
      <button @click="clearConsole">
        Clear Console Log
      </button>
    </div>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  name: 'Console',
  data () {
    return {
      webspaceConsoleLog: {}
    }
  },
  created () {
    this.retrieveConsoleLog()
    // this.drawStatusRect()
  },
  methods: {
    async clearConsole () {
      try {
        confirm('Are you sure you want to clear the console?')
        // clearing the console
        this.clearConsole = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/log', 'DELETE')
        // notification that it has deleted
        alert('Console Cleared')
      } catch (err) {
        alert('Unable to clear console log ' + err.message)
      }
    },
    async retrieveConsoleLog () {
      this.isLoading = true
      try {
        this.webspaceConsoleLog = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/log', 'GET')
        console.log(this.webspaceConsoleLog)
      } catch (err) {
        // Error message
        alert('Unable to retrieve webspace console log: ' + err.message)
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
    .consoleLogTitle {
        display: flex;
        justify-content: right;
        align-items: right;
        height: 100%;
        width: 100%;
        font-size: 30px;
        font-weight: 600;
    }
    .content{
        display: flex;
        justify-content: right;
        align-items: right;
    }
    .buttons{
        display: flex;
        justify-content: right;
        align-items: right;
    }
</style>
