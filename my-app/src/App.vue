<template>
  <div class="dashboard">
    <NavigationBar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box
}

header {
  width: 100vw;
  background-color:rgb(57, 0, 190);
  padding:25px;
}

body {
  padding: 10px;
  font-family: Segoe UI, sans-serif;
}

h2 {
  color: #0040d0;
  margin: 10px 20px 10px 0px;
}

h3 {
  color: #0040d0;
  margin: 20px 10px 10px 0px;
}

p {
  color: #0040d0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

select, input {
  background: transparent;
  color: #0040d0;
  font-weight: bold;
  border: 2px solid #0040d0;
  border-radius: 2px;
}

.dashboard{
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: blue;
  height: 100vh;
  width: 100vw;
}

.content{
  background-color: white;
  border-radius: 15px;
  margin: 6px 6px 6px 0px;
}
</style>
