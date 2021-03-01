<template>
  <div>
    <header>
        <Navbar/>
    </header>
    
  </div>
</template>

<script>
import Navbar from './components/NavigationBar';

export default {
  name: 'App',
  components: {
    Navbar
  },
  
};
</script>


<style >
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box
}

body{
  font-family: 'montserrat', sans-serif;

}


header{
  width: 100vw;
  background-color:rgb(57, 0, 190);
  padding:25px;
}

</style>