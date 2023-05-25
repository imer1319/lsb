	<template>
		<div class="flex flex-col items-center pt-12">
			<div class="z-10">
				<div class="relative">
					<input type="text"
					class="p-2 pl-8 w-80 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:border-transparent"
					v-model="busqueda" placeholder="Ingrese las palabras" @keydown.down.prevent="seleccionarSiguiente"
					@keydown.up.prevent="seleccionarAnterior" @keydown.enter.prevent="completarPalabra"
					@keydown="handleDeleteKey" />
					<svg class="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none"
					viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<ul v-if="busqueda.length >= 2 && mostrarSugerencias" class="bg-white border border-gray-100 w-full mt-2">
				<li v-for="(sugerencia, index) in sugerencias" :key="sugerencia"
				class="pl-8 pr-2 py-1 border-b-2 border-blue-100 relative cursor-pointer hover:bg-blue-50 hover:text-blue-900"
				:class="{ 'bg-blue-50': index === indiceSugerenciaSeleccionada }" @click="autocompletarPalabra(index)">
				<svg class="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
				fill="currentColor">
				<path fill-rule="evenodd"
				d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
				clip-rule="evenodd" />
			</svg>
			<b>{{ sugerencia.name }}</b>
		</li>
	</ul>
</div>
<div class="text-white pb-4">
	<pre>{{ searchResults }}</pre>
</div>
<div class="grid grid-cols-6 gap-8 mt-16 absolute px-6">
	<div v-for="(palabra, index) in palabras" :key="index"
	class="max-w-lg rounded overflow-hidden shadow-lg bg-gray-700 p-1">
	<img class="w-full shadow-md" :src="palabra.icon" alt="Sunset in the mountains" />
	<div class="text-center text-gray-200 py-2">
		<span>{{ palabra.name }}</span>
	</div>
</div>
</div>
</div>
</template>

<script>
import { datos } from "../datos.js";

export default {
	data() {
		return {
			letras: ["A", "B", "C"],
			datos: datos,
			busqueda: "",
			sugerencias: [],
			mostrarSugerencias: false,
			indiceSugerenciaSeleccionada: -1,
			palabras: [],
			searchResults: [],
		};
	},
	watch: {
		busqueda() {
			if (this.busqueda.length >= 2) {
				this.obtenerSugerencias();
				this.mostrarSugerencias = true;
				this.indiceSugerenciaSeleccionada = -1;
			} else {
				this.sugerencias = [];
				this.mostrarSugerencias = false;
				this.indiceSugerenciaSeleccionada = -1;
			}
		},
	},
	methods: {
		getGridColClass(imageCount) {
			const colCount = Math.min(imageCount, 6);
			return `col-span-${colCount}`;
		},
		obtenerSugerencias() {
			const palabrasBusqueda = this.busqueda.toLowerCase().split(" ");
			const ultimaPalabra = palabrasBusqueda[palabrasBusqueda.length - 1];

			this.sugerencias = this.datos.filter(item => item.name.toLowerCase().includes(ultimaPalabra)).slice(0, 4);
		},
		autocompletarPalabra(index) {
			this.palabras.push(this.sugerencias[index]);
			this.busqueda = "";
			this.palabras.forEach((item) => {
				this.busqueda += item.name.toLowerCase() + " ";
			});
			this.mostrarSugerencias = false;
			this.indiceSugerenciaSeleccionada = -1;
		},
		completarPalabra() {
			if (this.indiceSugerenciaSeleccionada !== -1) {
				this.autocompletarPalabra(this.indiceSugerenciaSeleccionada);
				return;
			}
			this.palabras = [];
			const palabrasBusqueda = this.busqueda.toLowerCase().split(" ");
			for (const palabra of palabrasBusqueda) {
				const items = this.datos.filter(item => {
					const nameWords = item.name.toLowerCase().split(" ");
					return nameWords.some(nameWord => nameWord.includes(palabra));
				});
				if (items.length > 0) {
					this.palabras.push(...items);
				}
			}
			this.mostrarSugerencias = false;
			this.indiceSugerenciaSeleccionada = -1;
		},
		seleccionarSiguiente() {
			if (this.indiceSugerenciaSeleccionada < this.sugerencias.length - 1) {
				this.indiceSugerenciaSeleccionada++;
			}
		},
		seleccionarAnterior() {
			if (this.indiceSugerenciaSeleccionada > 0) {
				this.indiceSugerenciaSeleccionada--;
			}
		},
		handleDeleteKey(event) {
			if (event.key === 'Backspace') {
				this.palabras.pop();
				this.busqueda = ""
				this.palabras.forEach(item => {
					this.busqueda += item.name +" "
				})
			}
		}
	},
};
</script>
