import { createApp } from 'vue'
import App from './App.vue'

// Constants used throughout project
const constants = {
  data () {
    return {
      WEBSPACED_API_URL: 'https://webspaced.netsoc.ie/v1',
      IAM_API_URL: 'https://iam.netsoc.ie/v1'
    }
  }
}

createApp(App).mixin(constants).mount('#app')
