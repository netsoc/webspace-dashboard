
<template>
  <div>
    <div v-if="!isLoading">
      <h2>Create Webspace</h2>
      <p>Create and initialize your new webspace.</p>
      <p>Learn more <a href="">here</a>.</p>

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
      <div
        v-if="webspaceConfig.image"
        class="image-details-section"
      >
        <div style="width: 50px">
          <p>icon</p>
          <p>here</p>
        </div>
        <div>
          <p><b>{{ webspaceConfig.image.properties.description }}</b></p>
          <p>{{ bytesToHumanReadable(webspaceConfig.image.size) }}</p>
        </div>
      </div>

      <h3>Give the Webspace a Password</h3>
      <input
        v-model="webspaceConfig.password"
        class="webspace-password-input"
        type="password"
        placeholder="Password (optional)"
      >
      <div v-if="webspaceConfig.password.length != 0">
        <input
          v-model="webspaceConfig.passwordConfirmation"
          class="webspace-password-input"
          type="password"
          placeholder="Confirm Password"
        >
        <div v-if="webspaceConfig.password === webspaceConfig.passwordConfirmation">
          <p>match!</p>
        </div>
      </div>

      <h3>Additional Configuration</h3>
      <input
        id="webspaceSSHEnabled"
        v-model="webspaceConfig.SSHEnabled"
        class="additional-config-checkbox"
        type="checkbox"
      >
      <label for="webspaceSSHEnabled">Enable SSH</label>
      <div
        v-if="webspaceConfig.SSHEnabled"
        class="additional-config-ssh-section"
      >
        <input
          id="webspaceSSHPasswordEnabled"
          v-model="webspaceConfig.SSHPasswordEnabled"
          class="additional-config-checkbox"
          type="checkbox"
        >
        <label for="webspaceSSHPasswordEnabled">Enable SSH password login</label>
        <input
          id="webspaceSSHPKAEnabled"
          v-model="webspaceConfig.SSHPKAEnabled"
          class="additional-config-checkbox"
          type="checkbox"
        >
        <label for="webspaceSSHPKAEnabled">Generate & Enabled SSH Public Key Authentication</label>
      </div>
      <input
        id="webspaceSetupNginx"
        v-model="webspaceConfig.setupNginx"
        class="additional-config-checkbox"
        type="checkbox"
      >
      <label for="webspaceSetupNginx">Setup nginx webserver</label>
      <input
        id="webspaceBootImmediately"
        v-model="webspaceConfig.bootImmediately"
        class="additional-config-checkbox"
        type="checkbox"
      >
      <label for="webspaceBootImmediately">Boot immediately</label>

      <button
        class="primary-button"
        @click="initiateWebspace"
      >
        Initiate Webspace
      </button>
    </div>

    <div v-else>
      <!-- TODO: Delay before showing this -->
      <!-- TODO: Animation to show page is still responsive -->
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import * as API from '@/API.js'

export default {

  name: 'CreateWebspace',

  props: {
    authToken: { type: String, default: '' }
  },

  data () {
    return {
      isLoading: true,
      // Array of images fetched
      availableImages: null,
      // New webspace configuration
      webspaceConfig: {
        image: null,
        password: '',
        passwordConfirmation: '',
        SSHEnabled: false,
        SSHPasswordEnabled: true,
        SSHPKAEnabled: false,
        setupNginx: false,
        bootImmediately: true
      }
    }
  },

  // Fetchs the available images when this view is created
  created () {
    this.fetchAvailableImages()
  },

  methods: {
    // Formats bytes into human readable sizes, such as KB or GB, depending on the magnitude
    // Algorithm Credit: zentala (GitHub)
    bytesToHumanReadable (bytes) {
      const decimalPlaces = 2
      const units = ['Bytes', 'KB', 'MB', 'GB']
      const unitSizes = 1024
      const magnitude = Math.min(Math.floor(Math.log(bytes) / Math.log(unitSizes)), units.length - 1)
      return (bytes / Math.pow(unitSizes, magnitude)).toFixed(decimalPlaces) + ' ' + units[magnitude]
    },

    // Retrieves all the available LDX images from the Netsoc Webspaced API
    async fetchAvailableImages () {
      this.isLoading = true
      try {
        const images = await API.fetch(API.WEBSPACED_API_URL + '/images')
        this.availableImages = images
      } catch (err) {
        alert('Unable to fetch available OS images: ' + err.message)
      }
      this.isLoading = false
    },

    // Executed when user clicks "Initiate Webspace" button
    async initiateWebspace () {
      this.isLoading = true
      try {
        const body = { 'image': this.webspaceConfig.image.aliases[0].name }
        const res = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self', 'POST', body)
        alert('New webspace successful initialized: ' + JSON.stringify(res))
      } catch (err) {
        alert('Unable to initialize new webspace: ' + err.message)
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped>

select .image-select-menu {
  font-weight: bold;
  margin: 0px 0px 10px 0px;
  width: 200px;
}

</style>
