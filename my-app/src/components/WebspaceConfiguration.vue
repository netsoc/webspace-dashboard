
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
      }
    }
  },

  // Fetchs the available images when this view is created
  created () {
    this.findConfig()
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
    }

  }
}
</script>
