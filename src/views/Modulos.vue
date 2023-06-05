<template>
    <div class="flex items-center justify-center">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <div class="relative" v-for="modulo in modulos" :key="modulo">
                <div
                    class="px-4 py-4 text-lg font-bold text-white flex items-center justify-center absolute rounded-lg shadow-lg bg-turquesa-500 left-4 -top-6">
                    {{ modulo.name }}
                </div>
                <div class="bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl h-[320px] hover:h-[500px] overflow-hidden">
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
import { datosCategorias } from '../datos';
export default {
    computed: {
        modulos() {
            return [
                { id: 1, name: 'Modulo 1', categorias: datosCategorias(1) },
                { id: 2, name: 'Modulo 2', categorias: datosCategorias(2) },
                { id: 3, name: 'Modulo 3', categorias: datosCategorias(3) },
                { id: 4, name: 'Modulo 4', categorias: datosCategorias(4) },
            ]
        }
    }
}
</script>