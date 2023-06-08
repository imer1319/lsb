<template>
    <div class="flex flex-col items-center justify-center">
        <div class="mb-12">
            <input type="text" v-model="busqueda" placeholder="Buscar">
            <button @click="openModal" class="btn">Abrir Modal</button>
            <transition name="modal">
                <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-30" @click="closeModal">
                    <div class="modal-overlay absolute inset-0 bg-gray-300 opacity-50"></div>
                    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
                        @click.stop>
                        <div class="modal-content py-4 text-left px-6">
                            <!-- Contenido del modal -->
                            {{ JSON.stringify(item) }}
                        </div>
                        <div class="modal-footer py-4 px-6">
                            <!-- Botón para cerrar el modal -->
                            <button @click="closeModal" class="btn">Cerrar</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <div class="relative" v-for="modulo in modulos" :key="modulo">
                <div
                    class="px-4 py-4 text-lg font-bold text-white flex items-center justify-center absolute rounded-lg shadow-lg bg-turquesa-500 left-4 -top-6">
                    {{ modulo.name }}
                </div>
                <div class="bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl h-[320px] hover:h-[400px] overflow-hidden">
                    <div class="hover:overflow-y-scroll h-full">
                        <router-link :to="{ name: 'Modulo', params: { id: categoria.id } }"
                            class="flex space-x-2 text-gray-500 text-md my-3 hover:text-turquesa-500 capitalize"
                            v-for="(categoria, index) in modulo.categorias" :key="index">
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
import Modal from '../components/Modal.vue'
import { datosCategorias } from '../datos';
import Fuse from 'fuse.js';
import items from '../items.json'
export default {
    components: {
        Modal,
    },
    data() {
        return {
            showModal: false,
            busqueda: '',
            item: {}
        }
    },
    computed: {
        modulos() {
            return [
                { id: 1, name: 'Modulo 1', categorias: datosCategorias(1) },
                { id: 2, name: 'Modulo 2', categorias: datosCategorias(2) },
                { id: 3, name: 'Modulo 3', categorias: datosCategorias(3) },
                { id: 4, name: 'Modulo 4', categorias: datosCategorias(4) },
            ]
        }
    },
    methods: {
        openModal() {
            const fuse = new Fuse(items, {
                keys: ['name'],
                location: 100,
                distance: 0,
            });
            const resultado = fuse.search(this.busqueda);
            console.log(resultado);
            this.showModal = true;
        },
        closeModal(event) {
            if (event.target === event.currentTarget) {
                this.showModal = false;
            }
            this.item = {}
        },
    },
}
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
</style>