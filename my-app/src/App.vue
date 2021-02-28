<template>
  <div id="app">
    <select name="Images">
      <option v-for="(image, index) in images" :key="index">
        {{image.aliases[0].name}}
      </option>
    </select>
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
