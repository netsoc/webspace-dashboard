<template>
  <div class="Account">
    <p>Account Details</p>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  async beforeRouteEnter (to, from, next) {
    if (await API.isUserLoggedIn()) {
      next() // Accept logged in users
    } else {
      next('login') // Redirect non-logged in users
    }
  }
}
</script>

<style scoped>
    .Account {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 40px;
        font-weight: 600;
    }
</style>
