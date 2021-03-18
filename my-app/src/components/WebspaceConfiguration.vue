
<template>
  <div>
    <p>Webspace Configuration</p>

    <br><br>
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
        /*
        const res = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'GET')
        alert('Webspace config data: ' + JSON.stringify(res))
        this.webspaceConfig.startupDelay = res[0]
        this.webspaceConfig.httpPort = res[1]
        this.webspaceConfig.sniPassthrough = res[2]
        */
        this.webspaceConfig = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'GET')
        // alert('Webspace config data: ' + JSON.stringify(this.webspaceConfig))
      } catch (err) {
        alert('Unable to find webspace config data: ' + err.message)
      }
      this.isLoading = false
    }

  }
}
</script>
