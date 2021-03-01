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
        <input v-model.lazy="message" placeholder="testing">
        <p>Message is: {{ message }}</p>

    <button @click="changeDD">Attempt to force update:  {{ selected }}</button>

    <h2>Test of Remote data</h2>
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

  export default {
  name: 'Dropdown',
  props: {
    msg: String
    //,components
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