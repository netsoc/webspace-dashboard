<template>
  <nav>
    <div class="menu-item">
      <a href="#" />About
    </div>
    <div class="menu-item">
      <a href="#" />Docs
    </div>
    <div class="menu-item">
      <a href="#" />Create Webspace
    </div>
    <div class="menu-account-item">
      <a href="#" />Account
    </div>
    <div class="menu-account-item">
      <a href="#" />Logout
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style >
nav {
  display: flex;
  align-items: center;
  justify-content: center ;
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
