import { createApp } from 'vue'
import App from './App.vue'

// Common variables used throughout project
const commonVariables = {
  data () {
    return {
      API_URL: 'https://webspaced.netsoc.ie/v1',
      AUTH_TOKEN: ''
    }
  }
}

createApp(App).mixin(commonVariables).mount('#app')
