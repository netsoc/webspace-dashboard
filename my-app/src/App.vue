<template>
  <div id="app">
    <ul>
      <li v-for="(image, index) in images" :key="index">
        {{image.aliases[0].name}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      images: {}
    }
  },
  beforeMount(){
    this.getImages();
  },
  methods: {
    async getImages(){
      const res = await fetch('https://webspaced.netsoc.ie/v1/images');
      const images = await res.json();
      this.images = images;
    }
  }
};
</script>
