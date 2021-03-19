import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Common variables used throughout project
//const commonVariables = {
//  data () {
//    return {
//      WEBSPACED_API_URL: 'https://webspaced.netsoc.ie/v1',
//      IAM_API_URL: 'https://iam.netsoc.ie/v1',
//      AUTH_TOKEN: ''
//    }
//  }
//}

//createApp(App).mixin(commonVariables).mount('#app')
createApp(App).use(router).mount('#app')
