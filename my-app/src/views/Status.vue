<template>
  <div class="status">
    <h1>Webspace Status</h1>
    <br>
    <div v-if="webspaceState.running">
      <div class="indicator">
        <status-indicator
          active
          pulse
        />
      </div>
      <p>Online</p>
      <time>{{ readableTimes(webspaceState.uptime) }}</time>
      <button @click="rebootContainer">
        Reboot
      </button>
      <button @click="shutDownContainer">
        Shut Down
      </button>
      <button @click="reGenerateWebspacesConfig">
        Regenerate Config
      </button>
    </div>
    <div v-else>
      <status-indicator
        negative
        pulse
      />
      <p>Offline</p>
      <button @click="startContainer">
        Start Container
      </button>
    </div>
    <br>
    <h3>Resource Usage</h3>
    CPU time : {{ webspaceState.usage.cpu / 1000000 }}ms<br>
    Disk usage : {{ (webspaceState.usage.disks.root / 1048576).toFixed(0) }} MiB<br>
    Memory usage : {{ (webspaceState.usage.memory / 1048576).toFixed(0) }} MiB<br>
    Running processes : {{ webspaceState.usage.processes }} <br>
    <br>
    <div v-if="webspaceState.running">
      <h3>Network</h3>
      <status-indicator
        active
        pulse
      />
      <p>eth0</p> {{ webspaceState.networkInterfaces.eth0.mac }} <br>
      Data sent/received: {{ (webspaceState.networkInterfaces.eth0.counters.bytesSent / 1024).toFixed(1) }} KiB/{{ (webspaceState.networkInterfaces.eth0.counters.bytesReceived / 1024).toFixed(1) }} KiB<br>
      Packets sent/received: {{ webspaceState.networkInterfaces.eth0.counters.packetsSent }}/{{ webspaceState.networkInterfaces.eth0.counters.packetsReceived }}<br>
      <div
        v-for="address in webspaceState.networkInterfaces.eth0.addresses"
        :key="address.id"
        :value="address"
      >
        <p v-if="address.family === 'inet'">
          IPv4
        </p>
        <p v-if="address.family === 'inet6'">
          IPv6
        </p>
        address: {{ address.address }}/{{ address.netmask }}<br>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '@/API.js'
// import LineGraph from '@/components/LineGraph.vue'
export default {

  name: 'ManageWebspaceStatus',
  // components: { LineGraph },

  // When to prevent routing to this component
  async beforeRouteEnter (to, from, next) {
    if (await API.isUserLoggedIn()) {
      await API.fetch(API.WEBSPACED_API_URL + '/webspace/self')
        .then(() => next()) // Accept users with a webspace
        .catch(() => next('createwebspace')) // Redirect users without a webspace
    } else {
      next('login') // Redirect non-logged in users
    }
  },

  data () {
    return {
      exit: false,
      // the webspace status
      webspaceState: {
        running: null,
        uptime: null,
        usage: {
          cpu: null,
          disks: {
            root: null
          },
          memory: null,
          processes: null
        },
        networkInterfaces: {
          eth0: {
            mac: null,
            mtu: null,
            state: null,
            counters: {
              bytesReceived: 0,
              bytesSent: 0,
              packetsReceived: 0,
              packetsSent: 0
            },
            address: []
          }
        }
      }
    }
  },
  created () {
    this.fetchWebspacesState()
    this.pollData()
  },
  methods: {
    async fetchWebspacesState () {
      this.userStatus()
      try {
        this.webspaceState = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'GET')
      } catch (err) {
        if (this.exit) {
          alert('Unable to find webspace state data: ' + err.message)
        }
      }
      return this.webspaceState
    },

    async reGenerateWebspacesConfig () {
      try {
        confirm('Are you sure you want to re-generate the current container configuration?')
        this.reGenerateWebspacesConfig = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'PATCH')
        // notification that the container has started
        alert('You have successfully regenerate the webspace container configuration.')
      } catch (err) {
        alert('Unable to regenerate the webspace container configuration. ' + err.message)
      }
      this.fetchWebspacesState()
    },

    async startContainer () {
      try {
        this.startContainer = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'POST')
        // notification that the container has started
        alert('You have successfully started your webspace container.')
      } catch (err) {
        alert('Unable to start a webspace container. ' + err.message)
      }
      this.fetchWebspacesState()
    },

    async rebootContainer () {
      try {
        confirm('Are you sure you want to reboot the current container?')
        this.rebootContainer = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'PUT')
        // notification that the container has rebooted
        alert('You have successfully rebooted your webspace container.')
      } catch (err) {
        alert('Unable to reboot the current webspace container. ' + err.message)
      }
      this.fetchWebspacesState()
    },

    async shutDownContainer () {
      try {
        confirm('Are you sure you want to shut down the current container?')
        this.shutDownContainer = await API.fetch(API.WEBSPACED_API_URL + '/webspace/self/state', 'DELETE')
        // notification that the container has shut down
        alert('You have successfully shut down your webspace container.')
      } catch (err) {
        alert('Unable to delete the current webspace container. ' + err.message)
      }
      this.fetchWebspacesState()
    },
    readableTimes (runtime) {
      var hrs = Math.trunc(runtime / 3600)
      var mins = Math.trunc((runtime % 3600) / 60)
      var secs = Math.trunc(runtime % 60)
      return (hrs + 'h ' + mins + 'm ' + secs + 's')
    },
    pollData () {
      if (this.userStatus()) {
        this.polling = setInterval(() => {
          this.fetchWebspacesState()
        }, 2000)
      } else {
        clearInterval(this.polling)
        console.log('Debug')
      }
    },
    async userStatus () {
      this.exit = await API.isUserLoggedIn()
      return this.exit
    }
  }
}

</script>

<style>
.status {
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
  color: #0040d0;
}

.status button {
  background-color: #0055FF; /* Green */
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 25px;
  border-radius: 5px;
}

.status p {
  float: none;
  display: inline;
}

.status time {
  margin-left: 5px;
  font-size: 13px;
}

.indicator {
  float: left;
  display: inline;
}

:root {
  --status-indicator-size: 10px;
  --status-indicator-animation-duration: 2s;

  --status-indicator-color-active: rgb(0, 149, 255);
  --status-indicator-color-active-semi: rgba(0, 149, 255, .5);
  --status-indicator-color-active-transparent: rgba(0, 149, 255, 0);

  --status-indicator-color-negative: rgb(255, 77, 77);
  --status-indicator-color-negative-semi: rgba(255, 77, 77, .5);
  --status-indicator-color-negative-transparent: rgba(255, 77, 77, 0);
}

@keyframes status-indicator-pulse-active {
  0%   { box-shadow: 0 0 0 0 var(--status-indicator-color-active-semi); }
  70%  { box-shadow: 0 0 0 var(--status-indicator-size) var(--status-indicator-color-active-transparent); }
  100% { box-shadow: 0 0 0 0 var(--status-indicator-color-active-transparent); }
}

@keyframes status-indicator-pulse-negative {
  0%   { box-shadow: 0 0 0 0 var(--status-indicator-color-negative-semi); }
  70%  { box-shadow: 0 0 0 var(--status-indicator-size) var(--status-indicator-color-negative-transparent); }
  100% { box-shadow: 0 0 0 0 var(--status-indicator-color-negative-transparent); }
}

status-indicator {
  display: inline-block;
  border-radius: 50%;
  cursor: pointer;
  width: var(--status-indicator-size);
  height: var(--status-indicator-size);
  background-color: var(--status-indicator-color);
  margin-right: 10px;
}

status-indicator[pulse] {
  animation-name: status-indicator-pulse;
  animation-duration: var(--status-indicator-animation-duration);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-delay: 0;
  animation-fill-mode: none;
}

status-indicator[active][pulse] {
  background-color: var(--status-indicator-color-active);
  animation-name: status-indicator-pulse-active;
}

status-indicator[negative][pulse] {
  background-color: var(--status-indicator-color-negative);
  animation-name: status-indicator-pulse-negative;
}
</style>
