<template>
  <div>
    <h3>Select your operating system image to install</h3>
    <select v-model="individuals.image">
				<option value="null">Choose your image</option>
				<option v-for="image in imagesList" :value="image" :key="image.id">
					{{image.aliases[0].name}}
				</option>
		</select>
    <button>Install</button>

    <div v-if="individuals.image">
      <p>Description: {{individuals.image.properties.description}}</p>
      <p>Os: {{individuals.image.properties.os}}</p>
      <p>Size: {{individuals.image.size}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name : "Webspaces",

  data()  {
    return  {
      imagesList : null,
      individuals : {
        image : null
      }
    }
  },

  created(){
    this.fetchImages()
  },

  methods: {
    fetchImages(){
      fetch("https://webspaced.netsoc.ie/v1/images").then(respone => {
        respone.json().then(data =>{
          this.imagesList = data;
          console.log(this.imagesList);
        });
      });
    }
  }
}

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  color: #3748e2;
}
</style>
