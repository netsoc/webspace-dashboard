
<template>
  <div class="primary-section">
    <div v-if="isLoading">
      <span>Loading...</span>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
export default {

  name: 'CreateWebspace',

  props: {
    authToken: { type: String, default: '' }
  },

  data () {
    return {
      // If the component is loading
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

    // Retrieves all the available LXD images from the Netsoc Webspaced API
    fetchAvailableImages () {
      this.isLoading = true
      fetch(`${this.WEBSPACED_API_URL}/images`).then(res => {
        // TODO: error handling
        res.json().then(data => {
          this.availableImages = data
          this.isLoading = false
        })
      })
    },

    // Executed when user clicks "Initiate Webspace" button
    initiateWebspace () {
      if (!this.webspaceConfig.image) {
        alert('select an image')
        return
      }
      this.isLoading = true
      const requestOptions = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify({
          'image': this.webspaceConfig.image.aliases[0].name
        })
      }
      fetch(`${this.WEBSPACED_API_URL}/webspace/self`, requestOptions).then(res => {
        // TODO: error handling
        // TODO: apply additional options
        // TODO: show progress, confirm completion
        res.text().then(text => {
          alert(res.status + ': ' + text)
          this.isLoading = false
        })
      })
    }
  }
}
</script>

<style scoped>

h3 {
  margin: 25px 0 0 0;
}

div .create-webspace-section {

}

div .image-details-section {
  display: flex;
}

div .additional-config-ssh-section {

}

select .image-select-menu {
  font-weight: bold;
  margin: 0px 0px 10px 0px;
  width: 200px;
}

.webspace-password-input input  {
  margin: 100px;
  padding: 10px;
}

input .additional-config-checkbox {

}

</style>
