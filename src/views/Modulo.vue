<template>
    <div>
        <h4 class="text-center text-3xl mb-4 uppercase font-bold text-turquesa-700">{{ categoria }}</h4>
        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-2 grid grid-cols-2 grid-flow-row border-r-2 border-gray-300">
                <div @click.prevent="showItem(dato)" v-for="(dato, index) in datosCategoria" :key="dato.id"
                    class="p-3 mb-2 mr-4 rounded-lg cursor-pointer shadow-sm text-lg"
                    :class="[item.id === dato.id ? 'text-white bg-turquesa-500' : 'text-gray-500 bg-white']">
                    <p>{{ (index + 1) }}. {{ dato.name }}</p>
                </div>
            </div>
            <div class="col-span-2">
                <div class="text-center text-turquesa-500 pb-4 font-bold text-2xl">
                    <span>{{ item.name }}</span>
                </div>
                <div class="flex">
                    <template v-for="(imagen, imagenIndex) in item.icon" :key="imagenIndex">
                        <div class="cardImage rounded-lg overflow-hidden shadow-lg bg-gray-200 pb-1 relative mx-auto">
                            <div v-if="item.icon.length > 1"
                                class="absolute top-2 right-2 bg-turquesa-500 h-10 w-10 flex items-center justify-center rounded-full text-lg text-gray-50 font-semibold">
                                <span>{{ letras[imagenIndex] }}</span>
                            </div>
                            <img class="w-[350px] shadow-md" :src="imagen" :alt="item.name" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { buscarDatosPorCategoria } from '../datos.js';

export default {
    created() {
        this.categoria = this.$route.params.categoria;
    },
    data() {
        return {
            categoria: null,
            item: {},
            letras: ["A", "B", "C"],

        };
    },
    methods: {
        showItem(item) {
            this.item.name = item.name
            this.item.icon = item.icon
            this.item.id = item.id
        }
    },
    computed: {
        datosCategoria() {
            return buscarDatosPorCategoria(this.categoria);
        },
    },
};
</script>
<style>
.cardImage {
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    background-color: transparent;

    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08),
        -3px -2px 3px rgba(255, 255, 255, 0.2),
        2px 2px 2px rgba(0, 0, 0, 0.08) inset;
}
</style>