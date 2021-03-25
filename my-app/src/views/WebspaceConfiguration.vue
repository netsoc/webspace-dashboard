
<template>
  <div>
    <p>Webspace Configuration</p>
    <!-- Need to add in some verification for if there is a webspace active -->
    <br>
    Startup Delay <br>
    {{ webspaceConfig.startupDelay }} seconds
    <br>
    HTTP Port <br>
    {{ webspaceConfig.httpPort }}
    <br>
    SNI Passthrough <br>
    {{ webspaceConfig.sniPassthrough }}
  </div>
  <div>
    <button
      v-for="domain in availableDomains"
      :key="domain.id"
      :value="domain"
      v-on:click="removeDomain(domain)"
    >
      {{ domain }}
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
      availableDomains: null
    }
  },

  // Fetchs the available images when this view is created
  created () {
    this.findConfig()
    this.fetchAvailableDomains()
  },

  methods: {

    async findConfig () {
      this.isLoading = true
      try {
        this.webspaceConfig = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'GET')
      } catch (err) {
        alert('Unable to find webspace config data: ' + err.message)
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
    async removeDomain (domain) {
      try {
        await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/domains/' + domain, 'DELETE')
        this.fetchAvailableDomains()
      } catch (err) {
        alert('Unable to remove domain: ' + err.message)
      }
    }

  }
}
</script>
