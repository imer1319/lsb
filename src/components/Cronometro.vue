<template>
  <div class="text-center">
    <p>{{ tiempoActual }}</p>
    <!-- Resto de tu interfaz del cronómetro -->
  </div>
</template>

<script>
export default {
  props: {
    tiempo: {
      type: Number,
      required: true,
    },
    pause: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tiempoActual: 0,
      intervalId: null,
    };
  },
  created() {
    this.tiempoActual = this.tiempo;
    if (this.pause) {
      this.intervalId = setInterval(() => {
        if (this.tiempoActual > 0) {
          this.tiempoActual--;
        } else {
          clearInterval(this.intervalId);
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
