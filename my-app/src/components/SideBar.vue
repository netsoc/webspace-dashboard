<template>
  <side>
    <img src="../netsoc-logo.png" contain height="170" width="190" />
    <div class="menu-text">
      <p />Webspace
    </div>
    <hr />
    <div class="menu-item">
      <a href="#" />About
    </div>
    <div class="menu-item">
      <a href="#" />Docs
    </div>
    <div class="menu-item">
      <a href="#" />Login
    </div>
  </side>
  <!-- <div class="sidenav">
    <a href="#about">About</a>
    <a href="#services">Docs</a>
    <a href="#contact">Login</a>
  </div> -->
</template>

<script>
export default {
  name: 'Sidenav'
}
</script>

<style>
side {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #0055FF;
  overflow-x: hidden;
  padding-top: 20px;
}

side .menu-text {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #ffffff;
  display: block;
}

side .menu-item {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #ffffff;
  display: block;
}

side .menu-item:hover {
  color: #000000;
}

.main {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
