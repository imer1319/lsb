<template>
  <div
    class="z-20 bg-white fixed h-screen border-r-2 shadow-lg rounded-tr-3xl rounded-br-3xl"
  >
    <nav
      class="flex flex-col items-center flex-shrink-0 w-16 py-4 bg-transparent"
    >
      <!-- Logo -->
      <div class="flex-shrink-0 py-4">
        <a href="#" class="outline-none">
          <img
            class="w-10 h-auto"
            src="https://raw.githubusercontent.com/kamona-ui/dashboard-alpine/main/public/assets/images/logo.png"
            alt="K-UI"
          />
        </a>
      </div>
      <!-- Navegacion -->
      <div class="flex flex-col items-center flex-1 p-2 space-y-4">
        <router-link
          v-for="ruta in rutas"
          :key="ruta"
          :to="ruta.route"
          class="group outline-none relative w-auto p-1 rounded-lg shadow-md hover:bg-turquesa-700 hover:text-white"
          :class="[
            route.path === ruta.route
              ? 'text-white bg-turquesa-500'
              : 'text-gray-500 bg-white',
          ]"
        >
          <span class="flex items-center z-10 w-auto">
            <i :class="ruta.icon"></i>
            <span
              class="hidden group-hover:flex absolute left-8 group-hover:bg-turquesa-700 py-2 px-2 group-hover:rounded-tr-lg group-hover:rounded-br-lg"
              >{{ ruta.name }}</span
            >
          </span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
<script>
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      route: useRoute(),
      rutas: [
        {
          route: "/",
          icon: "fa-solid fa-house p-2",
          name: "Inicio",
        },
        {
          route: "/buscador",
          icon: "fa-solid fa-magnifying-glass p-2",
          name: "Buscador",
        },
        {
          route: "/teclado",
          icon: "fa-solid fa-keyboard p-2",
          name: "Teclado",
        },
        {
          route: "/modulos",
          icon: "fa-solid fa-book p-2",
          name: "Modulos",
        },
      ],
    };
  },
};
</script>
