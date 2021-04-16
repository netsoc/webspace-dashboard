<template>
  <div
    v-if="errorDetails"
    class="popup-modal"
  >
    <div class="popup-modal-box">
      <h3>{{ errorTitle }}</h3>
      <p>{{ errorDetails }}</p>
      <br>
      <button @click="$emit('onErrorHandled')">
        OK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPopup',
  props: {
    errorTitle: {
      type: String,
      default: 'Error'
    },
    errorDetails: {
      type: String,
      required: true
    }
  },
  emits: [ 'onErrorHandled' ]
}
</script>

<style>
.popup-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
}

.popup-modal-box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30em;
  padding: 0 1em 1em 1em;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
}
</style>
