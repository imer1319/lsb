<template>
    <div class="flex items-center justify-center">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <!-- 1 card -->
            <div class="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl" v-for="modulo in  modulos "
                :key="modulo.id">
                <div
                    class=" text-white flex items-center justify-center absolute rounded-full w-12 h-12 shadow-xl bg-turquesa-500 left-4 -top-6">
                    <i :class="modulo.icon"></i>
                </div>
                <div class="mt-8">
                    <p class="text-xl font-semibold my-2">{{ modulo.name }}</p>
                    <div class="border-t-2"></div>
                    <router-link :to="{
                        name: 'Modulo', params: {
                            categoria: categoria.category
                        }
                    }
                        " class="flex space-x-2 text-gray-400 text-sm my-3 hover:text-turquesa-500"
                        v-for="(categoria, index) in  modulo.categorias" :key="index">
                        <i class="fa-solid fa-check text-[18px]"></i>
                        <p>{{ categoria.title }}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modulos: [
                {
                    id: 1, name: 'Modulo 1',
                    icon: 'fa-solid fa-baby text-3xl',
                    categorias: [
                        { title: 'Saludos', category: 'saludos' },
                        { title: 'Familia', category: 'familia' },
                        { title: 'Cuerpo humano', category: 'cuerpo_humano' },
                        { title: 'Alimentos', category: 'alimentos' },
                        { title: 'Lugares', category: 'lugares' },
                        { title: 'Naturaleza', category: 'naturaleza' },
                        { title: 'Colores', category: 'colores' },
                        { title: 'Animales', category: 'animales' },
                        { title: 'Departamentos de Bolivia', category: 'departamentos_de_bolivia' },
                        { title: 'Medios de transporte', category: 'medios_de_transporte' },
                        { title: 'Preguntas', category: 'preguntas' },
                        { title: 'Verbos', category: 'verbos' },
                        { title: 'Sustantivos', category: 'sustantivos' },
                        { title: 'Pronombres', category: 'pronombres' },
                        { title: 'Tiempo', category: 'tiempo' },
                        { title: 'Calendario', category: 'calendario' },
                        { title: 'Dias de la semana', category: 'dias_de_la_semana' },
                        { title: 'Verduras', category: 'verduras' },
                        { title: 'Frutas', category: 'frutas' },
                        { title: 'Numeros', category: 'numeros' }
                    ]
                },
                {
                    id: 2,
                    name: 'Modulo 2',
                    icon: 'fa-solid fa-child text-3xl',
                    categorias: [
                        { title: 'Opuestos', category: 'opuestos' },
                        { title: 'Verbos 2', category: 'verbos_2' },
                        { title: 'Continentes', category: 'continentes', },
                        { title: 'Paises', category: 'paises', },
                        { title: 'Tiempo 2', category: 'tiempo_2', },
                        { title: 'Prendas de vestir', category: 'prendas_de_vestir', },
                        { title: 'Sustantivo 2', category: 'sustantivo_2', },
                        { title: 'Familia 2', category: 'familia_2', },
                        { title: 'Animales 2', category: 'animales_2', },
                        { title: 'Trabajo', category: 'trabajo', },
                        { title: 'Historia', category: 'historia', },
                        { title: 'Lugares turisticos', category: 'lugares_turisticos', },
                        { title: 'Salud sexual y reproduccion', category: 'salud_sexual_y_reproduccion', },
                        { title: 'Educacion especial', category: 'educacion_especial', },
                        { title: 'Areas de conocimiento', category: 'areas_de_conocimiento', },
                        { title: 'Verduras 2', category: 'verduras_2', },
                        { title: 'Frutas 2', category: 'frutas_2', },
                        { title: 'Colores 2', category: 'colores_2', },
                        { title: 'Adverbios de lugar', category: 'adverbios_de_lugar', },
                        { title: 'Numeros 2', category: 'numeros_2' },
                    ]
                },
                {
                    id: 3,
                    name: 'Modulo 3',
                    icon: 'fa-solid fa-person text-3xl',
                    categorias: [
                        { title: 'Dialogo', category: 'dialogo', },
                        { title: 'Politica 1', category: 'politica_1', },
                        { title: 'Salud', category: 'salud', },
                        { title: 'Verbos 3', category: 'verbos_3', },
                        { title: 'Deportes', category: 'deportes', },
                        { title: 'Hogar', category: 'hogar', },
                        { title: 'Sustantivos 3', category: 'sustantivos_3', },
                        { title: 'Escuela', category: 'escuela', },
                        { title: 'Cocinar', category: 'cocinar', },
                        { title: 'Restaurante', category: 'restaurante', },
                        { title: 'Estado civil', category: 'estado_civil', },
                        { title: 'Opuestos 2', category: 'opuestos_2', },
                        { title: 'Animales 3', category: 'animales_3', },
                        { title: 'General 1', category: 'general_1', },
                        { title: 'Cumpleaños', category: 'cumpleaños', },
                        { title: 'Lugares 2', category: 'lugares_2', },
                        { title: 'Tiempo 3', category: 'tiempo_3', },
                        { title: 'Numeros 3', category: 'numeros_3' },
                    ]
                },
                {
                    id: 4,
                    name: 'Modulo 4',
                    icon: 'fa-solid fa-person-cane text-3xl',
                    categorias: [
                        { title: 'Cosas de animales', category: 'cosas_de_animales', },
                        { title: 'Verbos 4', category: 'verbos_4', },
                        { title: 'Salud 2', category: 'salud_2', },
                        { title: 'Opuestos 3', category: 'opuestos_3', },
                        { title: 'Cosas de alimentos', category: 'cosas_de_alimentos', },
                        { title: 'Personas', category: 'personas', },
                        { title: 'Hogar 2', category: 'hogar_2', },
                        { title: 'Paises 2', category: 'paises_2', },
                        { title: 'Dialogo 2', category: 'dialogo_2', },
                        { title: 'Politica 2', category: 'politica_2', },
                        { title: 'General 2', category: 'general_2', },
                        { title: 'Ropas 2', category: 'ropas_2', },
                        { title: 'Insectos', category: 'insectos', },
                        { title: 'Sustantivos 4', category: 'sustantivos_4', },
                        { title: 'Bebidas', category: 'bebidas', },
                        { title: 'Naturaleza 2', category: 'naturaleza_2', },
                        { title: 'Escuela 2', category: 'escuela_2', },
                        { title: 'Numeros 4', category: 'numeros_4' },
                    ]
                },
            ]
        }
    }
}
</script>