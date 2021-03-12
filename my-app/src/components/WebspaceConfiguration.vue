

<template>
    

</template>








<script>
export default {

  name: 'WebspaceConfiguration',

  props: {
    authToken: { type: String, default: '' }
  },


  data () {
    return {
      // Array of images fetched
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
    this.fetchWebspaceConfig()
  },

  methods: {

    // Retrieves all the available LXD images from the Netsoc Webspaced API
    fetchWebspaceConfig () {
        //figure out this format
      fetch(`${this.WEBSPACED_API_URL}/images`).then(res => {
        // TODO: error handling
        res.json().then(data => {
          this.availableImages = data
        })
      })
    },

    // Executed when user clicks "Initiate Webspace" button
    /*
    initiateWebspace () {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }/*,
        body: {
          'image': this.webspaceConfig.image.aliases[0].name
        }*/
      /*}
      fetch(`${this.WEBSPACED_API_URL}/webspace/self`, requestOptions).then(res => {
        res.text().then(text => alert(res.status + ': ' + text))
        // TODO: error handling
        // TODO: apply additional options
        // TODO: show progress, confirm completion
      })
    }
    */
  }
}
</script>