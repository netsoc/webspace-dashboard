
<template>
  <div>
    <div v-if="availableImages">
      <h2>Create Webspace</h2>
      <p>Create and initialize your new webspace. Learn more <a href="">here</a>.</p>

      <h3>Select an LDX Image</h3>
      <select v-model="webspaceConfig.image">
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
        <div style="display: flex">
          <div style="width: 50px">
            <p>icon</p>
            <p>here</p>
          </div>
          <div>
            <p><b>{{ webspaceConfig.image.properties.description }}</b></p>
            <p>{{ bytesToHumanReadable(webspaceConfig.image.size) }}</p>
          </div>
        </div>
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
      <div v-if="webspaceConfig.SSHEnabled">
        <input
          v-model="webspaceConfig.SSHPasswordEnabled"
          type="checkbox"
          label="webspaceSSHPasswordEnabled"
        >
        <label for="webspaceSSHPasswordEnabled">Enable SSH password login</label>
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
      <input
        id="webspaceBootImmediately"
        v-model="webspaceConfig.bootImmediately"
        type="checkbox"
      >
      <label for="webspaceBootImmediately">Boot immediately</label>

      <button @click="initiateWebspace">
        Initiate Webspace
      </button>
    </div>

    <div v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
export default {

  name: 'CreateWebspace',

  data () {
    return {
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
    fetchAvailableImages () {
      fetch(`${this.WEBSPACED_API_URL}/images`).then(res => {
        // TODO: error handling
        res.json().then(data => {
          this.availableImages = data
        })
      })
    },

    // Executed when user clicks "Initiate Webspace" button
    initiateWebspace () {
      alert('TODO')
    }
  }
}
</script>

<style scoped>
select {
  margin: 0px 0px 10px 0px;
  width: 200px;
}
</style>
