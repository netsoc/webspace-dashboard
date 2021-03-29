<template>
  <div>
    <div class="consoleLogTitle">
      <p>Console Log</p>
    </div>
    <h3 class="content">Click here to destroy your Webspace</h3>
    <div class="buttons">
      <button @click="clearConsole">
        Clear Console
      </button>
    </div>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  name: 'ManageWebspace',
  data () {
    return {}
  },
  methods: {
    async clearConsole () {
      try {
        confirm('Are you sure you want to clear the console?')
        // clearing the console
        this.clearConsole = await API.fetch(API.WEBSPACED_API_URL + '/webspace/log', 'DELETE')
        // notification that it has deleted
        alert('Console Cleared')
      } catch (err) {
        alert('Unable to clear console ' + err.message)
      }
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
