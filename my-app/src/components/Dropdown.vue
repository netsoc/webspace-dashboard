<template>
    <div id="v-model-select" class="demo">
        <h1>{{ msg }}</h1>
        <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span id="result">Selected: {{ selected }}</span>
        <br><br>

    
    </div>
    <div id="TestRemote" class="demo">
      <h2>Test of Remote data</h2>
      <button v-on:click="images">Attempt to force update:</button>
      <br><br>
      <span id="result-2">Images: {{ imagesList }}</span>
    </div>
</template>
<script>
  //import Vue from 'vue'
  //import VueDynamicForms from '@asigloo/vue-dynamic-forms';
  //import { DynamicForm } from '@asigloo/vue-dynamic-forms';
  import { createApp } from 'vue'
  //dropdown only updates values if new save is made

  //Vue.use(VueDynamicForms);
  //const components = {DynamicForm};
  createApp({
    data() {
      return {
        selected:''
      }
    },

    methods : {
      changeDD(){
       this.selected.push({
          selected: "C"
        })
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
  }).mount('#TestRemote')*/
  
      

  export default {
  name: 'Dropdown',
  props: {
    msg: String
    //,components

    
  }
  ,data() {
    return {
      selected: '',
      imagesList: []
    };
   },

  methods : {
    images(){
      fetch("https://webspaced.netsoc.ie/v1/images").then(x => x.json()).then(data => (this.imagesList = data));
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