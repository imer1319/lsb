<template>
  <header class="flex items-center justify-between p-4">
    <form action="#">
      <!--  -->
    </form>
    <button
      @click.prevent="toggleTheme"
      class="outline-none w-10 h-10 text-gray-400 bg-white rounded-lg shadow-md hover:text-gray-600"
    >
      <i class="fa-solid fa-sun p-1" v-if="dark"></i>
      <i class="fa-solid fa-moon" v-else></i>
    </button>
  </header>
</template>
<script>
export default {
  props: ["isDark"],
  mounted() {
    this.dark = this.isDark;
  },
  data() {
    return {
      dark: false,
    };
  },
  methods: {
    toggleTheme() {
      this.dark = !this.dark;
      this.$emit("remove-theme");
    },
  },
};
</script>
