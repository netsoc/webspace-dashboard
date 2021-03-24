<template>
  <div>
    <select
    >
      <option
        disabled
        :value="null"
      >
        Select a Domain
      </option>
      <option
        v-for="domain in availableDomains"
        :key="domain.id"
        :value="domain"
      >
        {{ domain }}
      </option>
    </select>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  name: 'Domains',
  data () {
    return {
      isLoading: true,
      // Array of images fetched
      availableDomains: null
    }
  },
  created () {
    this.fetchAvailableDomains()
  },
  methods: {
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
    }
  }
}
</script>
