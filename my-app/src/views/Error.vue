<template>
  <div class="Error">
    <p>Error {{ errorCode }}</p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    errorCode: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.Error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 40px;
  font-weight: 600;
}
</style>
