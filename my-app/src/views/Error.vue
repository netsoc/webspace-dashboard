<template>
  <div class="error">
    <h2>{{ errorTitle }}</h2>
    <p>{{ errorDetails }}</p>
    <br>
    <button @click="$router.replace('/')">
      Home
    </button>
    <button @click="$router.go(-1)">
      Back
    </button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    errorTitle: {
      type: String,
      required: true
    },
    errorDetails: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
}
</style>
