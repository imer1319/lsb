<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-30"
  >
    <div class="modal-overlay absolute inset-0 bg-gray-300 dark:bg-gray-900 opacity-60"></div>
    <div
      class="relative modal-container max-h-[32rem] bg-white dark:bg-gray-800 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto"
      :class="[modalSize ? modalSize : 'w-1/2']"
      @click.stop
    >
      <div class="overflow-y-scroll max-h-full">
        <div
          @click="cerrarModal"
          class="absolute right-2 top-2 text-2xl bg-gray-500 dark:bg-gray-50 text-white rounded-full w-8 h-8 text-center cursor-pointer"
        >
          <span class="dark:text-gray-900">x</span>
        </div>
        <div class="modal-content py-4 text-left px-6 dark:text-gray-100">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    modalSize: {
      type: String,
      default: "w-1/2",
    },
  },
  methods: {
    cerrarModal() {
      this.$emit("modal-cerrado");
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para el modal */
</style>
