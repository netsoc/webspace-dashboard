<template>
  <div class="create-webspace">
    <h2>Create Webspace</h2>
    <p>Create and initialize your new webspace.</p>
    <p>Learn more <a href="">here</a>.</p>

    <h3>Select an LXD Image</h3>
    <select
      v-model="webspaceConfig.image"
      class="select-menu"
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
    <div v-if="webspaceConfig.image">
      <br>
      <p><b>{{ webspaceConfig.image.properties.description }}</b></p>
      <p>{{ bytesToHumanReadable(webspaceConfig.image.size) }}</p>
    </div>

    <h3>Give the Webspace a Password</h3>
    <input
      v-model="webspaceConfig.password"
      type="password"
      placeholder="Password (optional)"
    >
    <div v-if="webspaceConfig.password.length != 0">
      <input
        v-model="webspaceConfig.passwordConfirmation"
        type="password"
        placeholder="Confirm Password"
      >
      <!-- TODO: highlight red instead -->
      <div v-if="webspaceConfig.password === webspaceConfig.passwordConfirmation">
        <p>match!</p>
      </div>
    </div>

    <h3>Additional Configuration</h3>
    <input
      id="webspaceSSHEnabled"
      v-model="webspaceConfig.SSHEnabled"
      type="checkbox"
    >
    <label for="webspaceSSHEnabled">Enable SSH</label>
    <br>
    <div
      v-if="webspaceConfig.SSHEnabled"
      style="margin-left: 20px"
    >
      <input
        id="webspaceSSHPasswordEnabled"
        v-model="webspaceConfig.SSHPasswordEnabled"
        type="checkbox"
      >
      <label for="webspaceSSHPasswordEnabled">Enable SSH password login</label>
      <br>
      <input
        id="webspaceSSHPKAEnabled"
        v-model="webspaceConfig.SSHPKAEnabled"
        type="checkbox"
      >
      <label for="webspaceSSHPKAEnabled">Generate & Enabled SSH Public Key Authentication</label>
    </div>
    <input
      id="webspaceSetupNginx"
      v-model="webspaceConfig.setupNginx"
      type="checkbox"
    >
    <label for="webspaceSetupNginx">Setup nginx webserver</label>
    <br>
    <input
      id="webspaceBootImmediately"
      v-model="webspaceConfig.bootImmediately"
      type="checkbox"
    >
    <label for="webspaceBootImmediately">Boot immediately</label>
    <br>
    <br>
    <button
      @click="initiateWebspace"
    >
      Initiate Webspace
    </button>
    <div v-if="isLoading">
      <br>
      <p>Loading...</p>
    </div>
    <ErrorPopup
      :error-details="errorMessage"
      @on-error-handled="onErrorHandled"
    />
  </div>
</template>

<script>
import * as API from '@/API.js'
import ErrorPopup from '@/components/ErrorPopup.vue'
export default {
  name: 'CreateWebspace',
  components: {
    ErrorPopup
  },
  // When to prevent routing to this component
  async beforeRouteEnter (to, from, next) {
    if (await API.isUserLoggedIn()) {
      await API.fetch(API.WEBSPACED_API_URL + '/webspace/self')
        .then(() => next('status')) // Redirect users already with a webspace
        .catch(() => next()) // Accept users without a webspace
    } else {
      next('login') // Redirect non-logged in users
    }
  },
  // Variables used within this component
  data () {
    return {
      errorMessage: '',
      isLoading: false,
      availableImages: null,
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
      try {
        const images = await API.fetch(API.WEBSPACED_API_URL + '/images')
        this.availableImages = images
      } catch (err) {
        this.errorMessage = 'Unable to fetch available LXD images: ' + err.message
      }
    },
    // Executed when user clicks "Initiate Webspace" button
    async initiateWebspace () {
      if (!this.webspaceConfig.image) {
        this.errorMessage = 'Please select an LXD image!'
        return
      }
      if (this.webspaceConfig.password && this.webspaceConfig.password !== this.webspaceConfig.passwordConfirmation) {
        this.errorMessage = 'Passwords do not match!'
        return
      }

      this.isLoading = true
      try {
        const body = { 'image': this.webspaceConfig.image.aliases[0].name }
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self', 'POST', body)
        // TODO: apply checkbox options
        this.$router.push('config')
      } catch (err) {
        this.errorMessage = 'Unable to initialize new webspace: ' + err.message
      }
      this.isLoading = false
    },
    // Executed after the user clicks OK during an error popup
    onErrorHandled () {
      this.errorMessage = ''
    }
  }
}
</script>

<style>
.create-webspace {
  margin-left: 20px;
  margin-top: 20px;

  /* TODO: this is just undoing the global styling in App.vue */
  justify-content: left;
  align-items: left;
  text-align: left;
}

</style>
