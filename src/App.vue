<template>
  <div class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
    <!-- Sidebar -->
    <navigation></navigation>
    <div class="flex flex-col flex-1">

      <Header />
      <div class="flex flex-1">
        <!-- Main -->
        <main class="flex justify-center flex-1 px-4">

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
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue"
import Header from "./components/Header.vue"
export default {
  components: {
    Navigation,
    Header
  },
  data() {
    return {
      isSidebarOpen: true,
      currentSidebarTab: null,
      isSettingsPanelOpen: false,
      isSubHeaderOpen: false,
      isOpen: false
    }
  }
}
</script>