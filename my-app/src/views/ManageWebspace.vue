<template>
  <div>
    <div class="ManageWebspace">
      <p>Manage Webspace</p>
    </div>
    <div class="buttons">
      <button @click="destroyWebspace">
        Destroy Webspace
      </button>
      <button @click="resetWebspace">
        Reset Webspace
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
    async destroyWebspace () {
      try {
        // add confirmation page "are you sure?" etc
        confirm('Are you sure you want to destroy this webspace?')
        // delete action
        // need to fix it
        this.destroyWebspace = await API.fetch(
          API.WEBSPACED_API_URL + '/webspace/self'
        )
        // notification that it has deleted
        alert('The webspace has been successfully destroyed')
      } catch (err) {
        alert('Unable to destroy webspace' + err.message)
      }
    },
    resetWebspace () {
      alert('TODO')
    }
  }
}
</script>

<style scoped>
    .ManageWebspace {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 40px;
        font-weight: 600;
    }
</style>
