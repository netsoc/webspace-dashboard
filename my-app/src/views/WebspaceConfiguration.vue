
<template>
  <div>
    <p>Webspace Configuration</p>
    <!-- Need to add in some verification for if there is a webspace active -->
    <br>
    Startup Delay <br>
    <input
      v-model.number="newWebspaceConfig.startupDelay"
      placeholder="Enter a value"
    >
    seconds
    <br>
    HTTP Port <br>
    <input
      v-model.number="newWebspaceConfig.httpPort"
      placeholder="Enter a value"
    >
    <br>
    SNI Passthrough <br>
    <input
      id="checkbox"
      v-model="newWebspaceConfig.sniPassthrough"
      type="checkbox"
    >
    <label for="checkbox">{{ newWebspaceConfig.sniPassthrough }}</label>
    <br>
    <button @click="updateWebConfig">
      Update Config
    </button>
  </div>
  <div>
    <p>Domains</p>
    Click on a domain to delete it
    <br>
    <div
      v-for="domain in availableDomains"
      :key="domain.id"
      :value="domain"
    >
      <button
        @click="removeDomain(domain)"
      >
        {{ domain }}
      </button>
      <br>
    </div>
    <input
      v-model="newDomain"
      placeholder="Enter a custom domain"
    >
    <button @click="addDomain">
      Add Domain
    </button>
  </div>
  <div>
    <p>Port Forwards</p>
    Click on a port forward to delete it
    <br>
    <div
      v-for="(internalPort, externalPort) in availablePortForwards"
      :key="externalPort"
      :value="internalPort"
    >
      <button
        @click="removePortForward(externalPort)"
      >
        {{ externalPort }} : {{ internalPort }}
      </button>
      <br>
    </div>
    <input
      v-model="newExternalPort"
      placeholder="Enter an external port"
    >
    <input
      v-model="newInternalPort"
      placeholder="Enter an internal port"
    >
    <button @click="addPortForward">
      Add Port Forward
    </button>
  </div>
</template>

<script>
import * as API from '@/API.js'

export default {

  name: 'WebspaceConfiguration',

  data () {
    return {
      isLoading: true,
      // New webspace configuration
      webspaceConfig: {
        startupDelay: null,
        httpPort: null,
        sniPassthrough: null
      },
      newWebspaceConfig: {
        startupDelay: null,
        httpPort: null,
        sniPassthrough: null
      },
      availableDomains: null,
      newDomain: null,
      availablePortForwards: null,
      newExternalPort: null,
      newInternalPort: null
    }
  },

  // Fetchs the available images when this view is created
  created () {
    this.findConfig()
    this.fetchAvailableDomains()
    this.fetchAvailablePortForwards()
  },

  methods: {

    async findConfig () {
      this.isLoading = true
      try {
        this.webspaceConfig = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'GET')
        // need these independent? - can resend default value if blank box
        this.newWebspaceConfig = this.webspaceConfig
      } catch (err) {
        alert('Unable to find webspace config data: ' + err.message)
      }
      this.isLoading = false
    },
    async updateWebConfig () {
      this.isLoading = true
      const body = this.newWebspaceConfig
      try {
        // Returns old values
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'PATCH', body)
        // need these independent? - can resend default value if blank box
        this.newWebspaceConfig = this.webspaceConfig
        this.findConfig()
        alert('Webspace Updated' + JSON.stringify(this.newWebspaceConfig))
      } catch (err) {
        alert('Unable to update webspace config data: ' + err.message + JSON.stringify(body))
      }
      this.isLoading = false
    },
    async fetchAvailableDomains () {
      this.isLoading = true
      try {
        const domains = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/domains')
        this.availableDomains = domains
      } catch (err) {
        // TODO: show error in HTML instead - maybe even navigate to an network error page?
        alert('Unable to fetch available domains: ' + err.message)
      }
      this.isLoading = false
    },
    async addDomain () {
      try {
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/domains/' + this.newDomain, 'POST')
        this.fetchAvailableDomains()
      } catch (err) {
        alert('Unable to add domain: ' + err.message)
      }
    },
    async removeDomain (domain) {
      try {
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/domains/' + domain, 'DELETE')
        this.fetchAvailableDomains()
      } catch (err) {
        alert('Unable to remove domain: ' + err.message)
      }
    },
    async fetchAvailablePortForwards () {
      this.isLoading = true
      try {
        const portForwards = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports')
        this.availablePortForwards = portForwards
      } catch (err) {
        alert('Unable to fetch available port forwards: ' + err.message)
      }
      this.isLoading = false
    },
    async addPortForward () {
      try {
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports/' + this.newExternalPort + '/' + this.newInternalPort, 'POST')
        this.fetchAvailablePortForwards()
      } catch (err) {
        alert('Unable to add port forward: ' + err.message)
      }
    },
    async removePortForward (externalPort) {
      try {
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports/' + externalPort, 'DELETE')
        this.fetchAvailablePortForwards()
      } catch (err) {
        alert('Unable to remove port forward: ' + err.message)
      }
    }
  }
}
</script>
