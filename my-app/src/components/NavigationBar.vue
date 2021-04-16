<template>
  <div class="side-nav-bar">
    <div class="title">
      <div>
        <img
          alt="Vue logo"
          src="../assets/netsoc-logo.png"
          contain
          height="180"
          width="200"
        >
      </div>
      <h1>Netsoc Webspaces</h1>
    </div>
    <div class="menu-items">
      <router-link
        to="/"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          About
        </div>
      </router-link>
      <router-link
        to="/docs"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Docs
        </div>
      </router-link>
      <router-link
        v-if="isUserLoggedIn && !isWebspaceInitialized"
        to="/createwebspace"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Create Webspace
        </div>
      </router-link>
      <router-link
        v-if="isUserLoggedIn"
        to="/account"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Account
        </div>
      </router-link>
      <router-link
        v-if="isUserLoggedIn && isWebspaceInitialized"
        to="/config"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Config
        </div>
      </router-link>
      <router-link
        v-if="isUserLoggedIn && isWebspaceInitialized"
        to="/status"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Status
        </div>
      </router-link>
      <router-link
        v-if="!isUserLoggedIn"
        to="/login"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Login
        </div>
      </router-link>
      <router-link
        v-if="isUserLoggedIn && isWebspaceInitialized"
        to="/console"
        active-class="active"
        tag="button"
        class="side-buttons"
      >
        <div class="link-container">
          Console
        </div>
      </router-link>
      <router-link
        v-if="isUserLoggedIn"
        to="/login"
        active-class="active"
        tag="button"
        class="side-buttons"
        @click="logout()"
      >
        <div class="link-container">
          Logout
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import * as API from '@/API.js'
export default {
  name: 'Navbar',
  data () {
    return {
      isUserLoggedIn: false,
      isWebspaceInitialized: false
    }
  },
  watch: {
    // Update the view if the route changes
    async $route (to, from) {
      // Check if the user is logged in
      this.isUserLoggedIn = await API.isUserLoggedIn()
      // Check if the user owns a webspace
      if (this.isUserLoggedIn) {
        API.fetch(API.WEBSPACED_API_URL + '/webspace/self')
          .then(() => { this.isWebspaceInitialized = true })
          .catch(() => { this.isWebspaceInitialized = false })
      } else {
        this.isWebspaceInitialized = false
      }
    }
  },
  methods: {
    logout () {
      API.clearToken()
    }
  }
}
</script>

<style >
nav {
  display: flex;
  align-items: center;
  justify-content: center ;
}

.title h1 {
        color: white;
        font-size: 24px;
        margin-top: 0px ;
    }

<style scoped >
    .title {
        color: white;
        font-size: 24px;
        margin-top: 0px ;
    }
    .menu-items {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 6px 8px 6px 16px;;
        margin-top: 20px;

    }
    .menu-items > * {
        margin-top: 10px;
        text-decoration: none;
    }
    .side-buttons:hover{
        background-color:rgb(96, 110, 235);
        border-bottom-color: red;
        padding: 6px 8px 6px 16px;
        border-radius: 15px;
        color: black;

    }
    .side-buttons:focus{
        outline: none;
    }
    .side-buttons {
        border:none;
        color: white;
        padding: 10px 0px;
        cursor: pointer;
        font-size: 20px;

    }
    nav{
        display: flex;
        align-items: left;
        justify-content: left;
    }

    nav .menu-item{
        color: white;
        padding: 10px 20px;
        position: relative;
        text-align: center;
        border-bottom: 3px solid transparent;
        display: flex;
        transition: 0.4s;

    }

nav .menu-item {
  color: white;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-account-item {
  color: white;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-account.active,
nav .menu-item:hover {
  background-color: #444;
  border-bottom-color: #383030;
}

nav .menu-account-item:hover {
  background-color: #444;
  border-bottom-color: #383030;
}

nav .menu-item a {
  color: inherit;
  text-decoration: none;
}

nav .menu-account-item a {
  color: inherit;
  text-decoration: none;
}
</style>
