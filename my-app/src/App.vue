<template>
  <div id="app">
    <select @change="changeSelectedImage($event)">
      <option>Select Image</option>
      <option v-for="(image, index) in images" :value="JSON.stringify(image)" :key="index">
        {{ image.aliases[0].name }}
      </option>
    </select>
    <div>Name: {{ selectedImage.aliases[0].name }}</div>
    <div>Fingerprint: {{ selectedImage.fingerprint }}</div>
    <div>Architecture: {{ selectedImage.properties.architecture }}</div>
    <div>Description: {{ selectedImage.properties.description }}</div>
    <div>Operating System: {{ selectedImage.properties.os }}</div>
    <div>Serial: {{ selectedImage.properties.serial }}</div>
    <div>Type: {{ selectedImage.properties.type }}</div>
    <div>Size: {{ selectedImage.size }}</div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      images: {},
      selectedImage: {
        "aliases": [
          {
            "name": "",
            "description": ""
          }
        ],
        "fingerprint": "",
        "properties": {
          "architecture": "",
          "description": "",
          "os": "",
          "release": "",
          "serial": "",
          "type": ""
        },
        "size": ""
      }
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
    },
    changeSelectedImage(event) {
      this.selectedImage = JSON.parse(event.target.options[event.target.options.selectedIndex].value)
    }
  }
}
</script>
