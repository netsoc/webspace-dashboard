
<template>
  <div>
    <p>webSpaceConfig</p>

    <button
      class="TempButton"
      @click="findConfig"
    >
      Test find
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
      }
    }
  },

  // Fetchs the available images when this view is created
  created () {
    // this.findConfig()
  },

  methods: {

    async findConfig () {
      this.isLoading = true
      try {
        const res = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/config', 'GET')
        alert('Webspace config data: ' + JSON.stringify(res))
      } catch (err) {
        alert('Unable to find webspace config data: ' + err.message)
      }
      this.isLoading = false
    }

  }
}
</script>
