<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mb-12">
      <span class="block text-sm text-gray-600 mb-1 dark:text-gray-200"
        >Presione <span class="font-semibold">enter</span> para buscar</span
      >
      <input
        type="text"
        v-model="busqueda"
        @keydown.enter.prevent="openModal"
        @keyup.delete="error = false"
        class="search w-96 focus:bg-white focus:outline-none focus:border-transparent"
        placeholder="Buscar"
      />
      <span v-if="error" class="text-red-600 block text-center text-sm mt-1"
        >{{ message }} <span class="font-bold">{{ busqueda }}</span></span
      >
      <transition name="modal">
        <Modal :showModal="showModal" @modal-cerrado="resetearModal" modalSize="w-3/5 lg:w-2/5">
          <div>
            <h4 class="text-2xl text-center font-bold mb-4">
              {{ item.name }}
            </h4>
            <p class="text-lg">
              Modulo:
              <span class="text-lg font-semibold capitalize">
                {{ item.modulo }}
              </span>
            </p>
            <p class="text-lg">
              Categoria:
              <span class="text-lg font-semibold capitalize">
                {{ item.categoryName }}
              </span>
            </p>
          </div>
          <div class="flex justify-end">
            <router-link
              :to="{ name: 'Modulo', params: { id: item.categoria } }"
              class="p-4 py-2 bg-turquesa-500 rounded-md text-white mr-4"
              >Encontrar</router-link
            >
          </div>
        </Modal>
      </transition>
    </div>
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
    >
      <div class="relative" v-for="modulo in modulos" :key="modulo">
        <div
          class="px-4 py-4 text-lg font-bold text-white flex items-center justify-center absolute rounded-lg shadow-lg bg-turquesa-500 left-4 -top-6"
        >
          <span>{{ modulo.name }}</span>
        </div>
        <div
          class="bg-white dark:bg-gray-800 py-6 px-6 rounded-3xl w-64 my-4 shadow-xl h-[320px] hover:h-[350px] overflow-hidden"
        >
          <div class="hover:overflow-y-scroll h-full">
            <router-link
              :to="{ name: 'Modulo', params: { id: categoria.id } }"
              class="flex space-x-2 text-gray-500 text-md my-3 hover:text-turquesa-500 capitalize"
              v-for="(categoria, index) in modulo.categorias"
              :key="index"
            >
              <i class="fa-solid fa-check text-[18px] mr-3"></i>
              {{ categoria.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "../components/Modal.vue";
import { datosCategorias, datos } from "../datos";
import Fuse from "fuse.js";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      busqueda: "",
      item: {},
      error: false,
      message: "",
    };
  },
  computed: {
    modulos() {
      return [
        {
          id: 1,
          name: "Modulo 1",
          categorias: datosCategorias(1),
        },
        {
          id: 2,
          name: "Modulo 2",
          categorias: datosCategorias(2),
        },
        {
          id: 3,
          name: "Modulo 3",
          categorias: datosCategorias(3),
        },
        {
          id: 4,
          name: "Modulo 4",
          categorias: datosCategorias(4),
        },
      ];
    },
  },
  methods: {
    resetearModal() {
      this.showModal = false;
    },
    openModal() {
      try {
        const fuse = new Fuse(datos, {
          keys: ["sinonimos"],
          threshold: 0.1,
          includeScore: true,
        });
        const resultado = fuse.search(this.busqueda);
        this.item = resultado[0].item;
        this.showModal = true;
        console.log(this.showModal);
        this.error = false;
      } catch (error) {
        this.error = true;
        this.message = "no encontrado";
      }
    },
  },
};
</script>

<style>
/* Estilos del modal */
.modal-overlay {
  z-index: 40;
}

.modal-container {
  z-index: 50;
}

.modal-content {
  z-index: 60;
}

.modal-footer {
  z-index: 70;
}

/* Animaciones de transición */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.search {
  outline: none;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  font-size: 15px;
  height: 53px;
  padding-left: 35px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08),
    -3px -2px 3px rgba(255, 255, 255, 0.2),
    2px 2px 2px rgba(0, 0, 0, 0.08) inset;
}
</style>
