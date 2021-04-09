
<template>
  <div class="general">
    <div class="config">
      <p>Webspace Configuration</p>
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
    <div class="list">
      <p>Domains</p>
      Add custom domains for your webspace.
      <br>
      <div
        v-for="domain in availableDomains"
        :key="domain.id"
        class="listItem"
        :value="domain"
      >
        <input
          :placeholder="domain"
        >
        <button
          @click="removeDomain(domain)"
        >
          ×
        </button>
        <br>
      </div>
      <input
        v-model="newDomain"
        placeholder="Enter a custom domain"
      >
      <button @click="addDomain">
        +
      </button>
    </div>
    <div class="list">
      <p>Port Forwards</p>
      Create port forwarding rules for your webspace.
      <br>
      Leave external port blank for a random port
      <br>
      <div
        v-for="(internalPort, externalPort) in availablePortForwards"
        :key="externalPort"
        class="listItem"
        :value="internalPort"
      >
        <input
          :placeholder="externalPort"
        >
        <input
          :placeholder="internalPort"
        >
        <button
          @click="removePortForward(externalPort)"
        >
          ×
        </button>
        <br>
      </div>
      <input
        v-model="newExternalPort"
        placeholder="External port"
      >
      <input
        v-model="newInternalPort"
        placeholder="Internal port"
      >
      <button @click="addPortForward">
        +
      </button>
    </div>
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
        alert('Webspace Updated')
      } catch (err) {
        alert('Unable to update webspace config data: ' + err.message)
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
        if (this.newExternalPort) {
          await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports/' + this.newExternalPort + '/' + this.newInternalPort, 'POST')
        } else {
          await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/ports/' + this.newInternalPort, 'POST')
        }
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

<style >
button {
  background-color: #0055FF; /* Green */
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 25px;
  border-radius: 5px;
}

.listItem {
  margin-bottom: 2px;
}
.list button {
  padding: 0px 4px 0px 4px;
  margin-left: 0px;
}

.list input {
  margin-right: 2px;
}

.config
{
  flex-direction: column;
  text-align: left;
  padding: 6px 8px 6px 16px;;
  margin-top: 20px;
}
.list
{
  flex-direction: column;
  text-align: left;
  padding: 6px 8px 6px 16px;;
  margin-top: 20px;
}
.general p
{
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
