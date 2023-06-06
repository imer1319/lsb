<template>
    <div class="pb-8">
        <h4 class="text-center text-3xl mb-6 uppercase font-bold text-turquesa-700 cursor-pointer" @click="item.name = ''">
            {{ datosCategoria.category.name }}</h4>
        <div class=" grid grid-cols-2 grid-flow-col gap-4">
            <div class="col-span-1 h-[400px] bg-gray-50 p-4 rounded-2xl shadow-sm">
                <div class="overflow-y-scroll max-h-full">
                    <div class="grid grid-cols-2 gap-x-4 gap-y-2 h-full">
                        <div @click.prevent="showItem(dato)" v-for="(dato, index) in datosCategoria.datos" :key="dato.id"
                            class="p-4 h-full mb-2  rounded-lg cursor-pointer shadow-md text-lg"
                            :class="[item.name === dato.name ? 'text-white bg-turquesa-500' : 'text-gray-500 bg-white']">
                            <p>{{ (index + 1) }}. {{ dato.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1">
                <template v-if="item.name">
                    <div class="text-center text-turquesa-500 pb-4 font-bold text-2xl">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <template v-for="(imagen, imagenIndex) in   item.icon  " :key="imagenIndex">
                            <div class="cardImage rounded-lg shadow-lg bg-gray-200 pb-1 p-2 relative mx-auto" :class="[
                                item.icon.length > 1 ? 'col-span-1' : 'col-span-2 mx-auto']">
                                <template v-if="item.icon.length > 1">
                                    <template v-if="item.isOption">
                                        <template v-if="item.size > 1">
                                            <div
                                                class="absolute top-4 right-4 bg-turquesa-500 h-10 w-10 flex items-center justify-center rounded-full text-lg text-gray-50 font-semibold">
                                                <span>{{ size2[imagenIndex] }}</span>
                                            </div>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <div
                                            class="absolute top-4 right-4 bg-turquesa-500 h-10 w-10 flex items-center justify-center rounded-full text-lg text-gray-50 font-semibold">
                                            <span>{{ letras[imagenIndex] }}</span>
                                        </div>
                                    </template>
                                </template>
                                <img class="w-[250px] shadow-md" :src="rutaImage + imagen" :alt="item.name" />
                            </div>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div class="flex">
                        <template v-for="(imagen, imgIndex) in datosCategoria.category.icon  " :key="imgIndex">
                            <div class="cardImage rounded-lg shadow-lg bg-gray-200 pb-1 p-2 relative mx-auto">
                                <div v-if="datosCategoria.category.icon > 1"
                                    class="absolute top-4 right-4 bg-turquesa-500 h-10 w-10 flex items-center justify-center rounded-full text-lg text-gray-50 font-semibold">
                                    <span>{{ letras[imgIndex] }}</span>
                                </div>
                                <img class="w-[250px] shadow-md" :src="rutaImage + imagen" :alt="item.name" />
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>
  
<script>
import { categoriesById } from '../datos.js';

export default {
    created() {
        this.categoria = this.$route.params.id;
    },
    data() {
        return {
            categoria: null,
            item: {},
            letras: ["A", "B", "C", "D", "E"],
            size2: ["A", "B", "A", "B"],
        };
    },
    methods: {
        showItem(item) {
            this.item.name = item.name
            this.item.icon = item.icon
            this.item.id = item.id
            this.item.isOption = item.isOption
            this.item.size = item.size
        }
    },
    computed: {
        datosCategoria() {
            return categoriesById(this.categoria);
        },
        rutaImage() {
            if (this.categoria < 21) {
                return '/modulo_1/'
            } else if (this.categoria > 20 && this.categoria < 42) {
                return '/modulo_2/'
            } else if (this.categoria > 41 && this.categoria < 60) {
                return '/modulo_3/'
            } else {
                return '/modulo_4/'
            }
        },
    }
};
</script>
<style>
.cardImage {
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08),
        -3px -2px 3px rgba(255, 255, 255, 0.2),
        2px 2px 2px rgba(0, 0, 0, 0.08) inset;
}
</style>