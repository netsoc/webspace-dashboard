<template>
  <div>
    <p>Manage Webspace</p>
    <h3>Click here to destroy your Webspace</h3>
    <div class="buttons">
      <button @click="destroyWebspace">
        Destroy Webspace
      </button>
      <br>
      <h3>Click here to reset your webspace</h3>
      <button @click="resetWebspace">
        Reset Webspace
      </button>
      <!-- dunno if this should be here -->
      <!--
      <h3>Select an LXD Image</h3>
      <select
        v-model="webspaceConfig.image"
        class="select-menu image-selection-menu"
      >
        <option
          disabled
          :value="null"
        >
          Select an Image
        </option>
        <option
          v-for="image in availableImages"
          :key="image.id"
          :value="image"
        >
          {{ image.aliases[0].name }}
        </option>
      </select>
      <div>
        v-if="webspaceConfig.image"
        class="image-details-section"
      </div>
    -->
    </div>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  name: 'ManageWebspace',
  data () {
    return {
      isLoading: true,
      // Array of images fetched
      availableImages: null
      // Does new webspace configuration go here? or is the API call enough
    }
  },
  methods: {
    async destroyWebspace () {
      try {
        confirm('Are you sure you want to destroy this webspace?')
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self', 'DELETE')
        this.$router.push('createwebspace')
      } catch (err) {
        alert('Unable to destroy webspace' + err.message)
      }
    },
    // Retrieves all the available LDX images from the Netsoc Webspaced API
    // Duplication of code from create webspace component
    async fetchAvailableImages () {
      this.isLoading = true
      try {
        const images = await API.fetch(API.WEBSPACED_API_URL + '/images')
        this.availableImages = images
      } catch (err) {
        // TODO: show error in HTML instead - maybe even navigate to an network error page?
        alert('Unable to fetch available OS images: ' + err.message)
      }
      this.isLoading = false
    },
    async resetWebspace () {
      try {
        confirm('are you sure you want to reset this webspace?')
        // ask them which LXD image they want
        // **pop in teds dropdown menu stuff here
        this.fetchAvailableImages()
        // retrieve the webspace and config stuff (3x GET requests)
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'GET')
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/domains', 'GET')
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports', 'GET')
        // delete the webspace
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self', 'DELETE')
        // Initialise the new webspace
        // not sure if this will apply the selected image or not
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self', 'POST')
        // Apply all the configurations
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'POST')
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/domains', 'POST')
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports', 'POST')
        // I presume theres no notification method needed here?
      } catch (err) {
        alert('Unable to reset webspace ' + err.message)
      }
    }
  }
}
</script>

<style scoped>
    p {
        display: flex;
        justify-content: left;
        align-items: left;
        height: 100%;
        width: 100%;
        font-size: 30px;
        font-weight: 600;
        margin-left: 20px;
        margin-top: 20px;
    }

    h3 {
        display: flex;
        text-align: left;
        margin-left: 20px;
        font-size: 15px;
    }

    .buttons {
      flex-direction: column;
      text-align: left;
      align-items: left;
      margin-left: 20px;
    }
    .buttons h3 {
      margin-left:0px;
    }

</style>
