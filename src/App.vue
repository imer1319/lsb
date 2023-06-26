<template>
  <div
    :class="isDark ? 'dark' : ''"
    class="flex h-full min-h-screen"
  >
    <navigation />
    <div class="flex flex-col w-full dark:bg-gray-900">
      <Header :isDark="isDark" @remove-theme="isDark = !isDark" />
      <main class="px-2 lg:px-24">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.name">
              <component :is="Component"></component>
            </div>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";
export default {
  components: {
    Navigation,
    Header,
  },
  data() {
    return {
      isDark: false,
    };
  },
};
</script>
