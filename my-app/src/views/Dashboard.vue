<template>
  <div class="dashboard">
    <NavigationBar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import NavigationBar from '@/components/NavigationBar'


export default {
  name: 'Home',
  components: {
    NavigationBar
  }
}
</script>

<style scoped>
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