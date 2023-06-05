<template>
	<div class="flex items-center">
		<div class="z-10 mx-auto">
			<div @click="showTextarea" class="relative flex items-center">
				<i class="fa-solid fa-magnifying-glass absolute left-4 top-5 text-gray-500"></i>
				<textarea ref="myTextarea" type="text" :rows="currentRows"
					class="search resize-none overflow-hidden h-auto w-96 focus:bg-white focus:outline-none focus:border-transparent"
					v-model="busqueda" placeholder="Ingrese las palabras" @keydown.down.prevent="seleccionarSiguiente"
					@keydown.up.prevent="seleccionarAnterior" @keydown.enter.prevent="completarPalabra"
					@blur="limpiarSugerencias"></textarea>
				<button @click.prevent="clearInput"
					class="bg-turquesa-500 hover:bg-turquesa-700 ml-4 py-3 px-5 rounded-lg shadow-md">
					<i class="fa-solid fa-trash text-white"></i>
				</button>
			</div>
			<ul v-if="busqueda.length >= 2 && mostrarSugerencias"
				class="sugerencias bg-white border border-gray-100 w-full">
				<li v-for="(sugerencia, index) in sugerencias" :key="sugerencia"
					class="pl-4 pr-2 py-1 border-b-1 border-blue-100 relative cursor-pointer hover:bg-blue-50 hover:text-blue-900"
					:class="{ 'bg-blue-50': index === indiceSugerenciaSeleccionada }"
					@mousedown="autocompletarPalabra(index)">
					<i class="fa-solid fa-magnifying-glass mr-4"></i>
					<b>{{ sugerencia.name }}</b>
				</li>
			</ul>
		</div>
		<div class="grid grid-cols-4 md:grid-cols-6 gap-8 absolute top-36 px-4 pb-8">
			<template v-for="(palabra, index) in palabras" :key="index">
				<template v-for="(imagen, imagenIndex) in palabra.icon" :key="imagenIndex">
					<div class="cardImage max-w-lg rounded-lg overflow-hidden shadow-lg bg-gray-200 pb-1 relative">
						<div v-if="palabra.icon.length > 1"
							class="absolute top-2 right-2 bg-turquesa-500 h-10 w-10 flex items-center justify-center rounded-full text-lg text-gray-50 font-semibold">
							<span>{{ letras[imagenIndex] }}</span>
						</div>
						<img class="w-full shadow-md" :src="imagen" :alt="palabra.name" />
						<div class="text-center text-turquesa-700 py-2 font-bold">
							<span>{{ palabra.name }}</span>
						</div>
					</div>
				</template>
			</template>
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
			currentRows: 1,
			showingTextarea: false,
			initialHeight: '53px'
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
	updated() {
		this.$nextTick(() => {
			const textarea = this.$el.querySelector('textarea');
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		});
	},
	methods: {
		obtenerSugerencias() {
			const palabrasBusqueda = this.busqueda.toLowerCase().split(" ");
			const ultimaPalabra = palabrasBusqueda[palabrasBusqueda.length - 1];

			this.sugerencias = this.datos
				.filter((item) => item.name.toLowerCase().includes(ultimaPalabra))
				.slice(0, 4);
		},
		autocompletarPalabra(index) {
			this.palabras.push(this.sugerencias[index]);
			this.mostrarSugerencias = false;
			this.indiceSugerenciaSeleccionada = -1;
			this.busqueda = "";
			this.palabras.forEach((item) => {
				this.busqueda += item.name.toLowerCase() + " ";
			});
		},
		completarPalabra() {
			if (this.indiceSugerenciaSeleccionada !== -1) {
				this.autocompletarPalabra(this.indiceSugerenciaSeleccionada);
				return;
			}
			this.palabras = [];
			const palabrasBusqueda = this.busqueda.trim().toLowerCase().split(" ");

			for (let i = 0; i < palabrasBusqueda.length; i++) {
				let palabraActual = palabrasBusqueda[i];
				let siguientePalabra = palabrasBusqueda[i + 1];

				let encontradoCompuesto = this.datos.find((item) => {
					if (
						item.name.toLowerCase() ===
						palabraActual + " " + siguientePalabra
					) {
						return true;
					}
				});

				if (encontradoCompuesto) {
					this.palabras.push(encontradoCompuesto);
					i++;
				} else {
					let siguienteSiguientePalabra = palabrasBusqueda[i + 2];
					let encontradoCompuesto3 = this.datos.find((item) => {
						if (
							item.name.toLowerCase() ===
							palabraActual +
							" " +
							siguientePalabra +
							" " +
							siguienteSiguientePalabra
						) {
							return true;
						}
					});

					if (encontradoCompuesto3) {
						this.palabras.push(encontradoCompuesto3);
						i += 2;
					} else {
						let encontradoIndividual = this.datos.find((item) => {
							if (item.name.toLowerCase() === palabraActual) {
								return true;
							}
						});

						if (encontradoIndividual) {
							this.palabras.push(encontradoIndividual);
						} else {
							console.log("no encontrado", palabraActual);
						}
					}
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
		limpiarSugerencias() {
			this.mostrarSugerencias = false;
			this.currentRows = 1;
			this.$refs.myTextarea.style.height = this.initialHeight;
		},
		showTextarea() {
			this.showingTextarea = true;
			this.$nextTick(() => {
				const textarea = this.$refs.myTextarea;
				textarea.focus();
				textarea.setSelectionRange(textarea.value.length, textarea.value.length);
				this.currentRows = textarea.value.split('\n').length;
				textarea.style.height = 'auto';
				textarea.style.height = `${textarea.scrollHeight}px`;
			});
		},
		clearInput() {
			this.busqueda = ''
			this.palabras = []
		},
		// rutaImage() {
		// 	if (this.categoria < 21) {
		// 		return '/modulo_1/'
		// 	} else if (this.categoria > 20 && this.categoria < 42) {
		// 		return '/modulo_2/'
		// 	} else if (this.categoria > 41 && this.categoria < 51) {
		// 		return '/modulo_3/'
		// 	} else {
		// 		return '/modulo_4/'
		// 	}
		// },
	},
};
</script>
<style scoped>
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

.cardImage {
	border: 3px solid rgba(255, 255, 255, 0.2);
	border-radius: 10px;
	background-color: transparent;

	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08),
		-3px -2px 3px rgba(255, 255, 255, 0.2),
		2px 2px 2px rgba(0, 0, 0, 0.08) inset;
}
</style>