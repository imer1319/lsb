<template>
  <div>
    <div class="flex justify-between items-center p-4">
      <img
        src="/winwheel/despertador.png"
        alt="despertador"
        class="w-16"
        :class="[finish ? '' : 'animate-bounce']"
      />
      <div class="text-3xl font-bold">{{ tiempoActual }}</div>
      <button
        class="outline-none bg-turquesa-500 shadow-lg w-12 h-12 text-white text-center text-lg rounded-full"
        @click.prevent="stoptime"
      >
        <i class="fa-solid fa-stop"></i>
      </button>
    </div>
    <slot></slot>
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
      play: false,
    };
  },
  created() {
    this.tiempoActual = this.tiempo;
    if (!this.pause) {
      this.intervalId = setInterval(() => {
        if (this.tiempoActual > 0) {
          this.tiempoActual--;
        } else {
          this.stoptime();
        }
      }, 1000);
    }
  },
  methods: {
    stoptime() {
      this.play = true
      clearInterval(this.intervalId);
      this.$emit("cronometro-stop");
    },
  },
  computed: {
    finish() {
      return this.tiempoActual === 0 || this.play == true;
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
