<template>
    <div id="v-model-select" class="demo">
        <h1>{{ msg }}</h1>
        <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
    </div>
</template>
<script>
  import { createApp } from 'vue'
  
  createApp({
      data() {
        return {
        selected: ''
      }
    }
  }).mount('#v-model-select')
  
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