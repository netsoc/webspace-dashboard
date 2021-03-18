<template>
  <div
    id="TestRemote"
    class="demo"
  >
    <h2>Test of Remote data</h2>

    <div
      v-for="imageData in imagesList"
      :key="imageData.fingerprint"
      class="image-data"
    >
      <span>{{ imageData.aliases[0].name }}</span>
    </div>
    <br><br>

    <select v-model="imageChoosen">
      <option
        disabled
        value=""
      >
        Please select one
      </option>
      <option
        v-for="imageData in imagesList"
        :key="imageData.fingerprint"
        :value="imageData.aliases[0].name"
      >
        {{ imageData.aliases[0].name }}
      </option>
    </select>
    <span id="result">Selected: {{ imageChoosen }}</span>
    <br><br>

    <br><br>
    <!-- <span id="result-2">Images: {{ imagesList }}</span> -->
  </div>
</template>
<script>

import { createApp } from 'vue'

createApp({
  data () {
    return {
      selected: ''
    }
  }

}).mount('#v-model-select')
/*
  createApp({
    data() {
      return {
        imagesList: [{"aliases":[{"name":"ubuntu18.04","description":""}],"fingerprint":"0e60015346f06627f10580d56ac7fffd9ea775f6d4f25987217d5eed94910a20","properties":{"architecture":"amd64","description":"Ubuntu bionic amd64 (20210228_07:42)","os":"Ubuntu","release":"bionic","serial":"20210228_07:42","type":"squashfs"},"size":102900380}]
      };
    },

    methods : {
      images(){
        fetch("https://webspaced.netsoc.ie/v1/images").then(x => x.json()).then(data => (this.imagesList = data));
      }

    }
  }).mount('#TestRemote') */

export default {
  name: 'Dropdown',
  props: {
    msg: String
    //, components

  },
  data () {
    return {
      imageChoosen: '',
      imagesList: []
    }
  },
  computed: {
    getAccountNames () {
      return this.aliases.map(dataSet => dataSet[0].name)
    }
  },
  created () {
    fetch('https://webspaced.netsoc.ie/v1/images').then(x => x.json()).then(data => (this.imagesList = data))
  },

  methods: {
    reloadImages () {
      fetch('https://webspaced.netsoc.ie/v1/images').then(x => x.json()).then(data => (this.imagesList = data))
    }

  }
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
