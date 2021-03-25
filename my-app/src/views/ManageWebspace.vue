<template>
  <div>
    <div class="ManageWebspace">
      <p>Manage Webspace</p>
    </div>
    <h3>Click here to destroy your Webspace</h3>
    <div class="buttons">
      <button @click="destroyWebspace">
        Destroy Webspace
      </button>
      <h3>Click here to reset your webspace</h3>
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
        confirm('Are you sure you want to destroy this webspace?')
        // delete action
        this.destroyWebspace = await API.fetch(
          API.WEBSPACED_API_URL + '/webspace/self', 'DELETE'
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
        font-size: 30px;
        font-weight: 600;
    }
</style>
