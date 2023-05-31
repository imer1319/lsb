<template>
    <div class="w-[900px] mx-auto rounded-lg">
        <div class="image-container h-[260px] mb-[20px] select-none overflow-y-scroll" ref="imageContainer">
            <div class=" flex" v-for="(linea, index) in lineas" :key="index">
                <div class="w-[6%] h-20 flex flex-wrap" v-for="image in linea" :key="image">
                    <img :src="getImagePath(image)" :alt="image">
                </div>
            </div>
        </div>
        <div class="keys flex justify-center">
            <button
                class="relative h-16 min-w-[70px] m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-violet-500 hover:bg-violet-700"
                v-for="numero in numeros" @click.prevent="disp(numero)">
                <img :src="`/remove/${numero}.png`" alt="" class="w-full h-full">
                <span class="absolute bottom-0 right-1 text-white font-semibold">{{ numero }}</span>
            </button>
        </div>
        <div class="keys flex justify-center">
            <button
                class="relative h-16 min-w-[70px] m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-cyan-500 hover:bg-cyan-700"
                v-for="key1 in keys1" @click.prevent="disp(key1)">
                <img :src="`/remove/${key1}.png`" alt="" class="w-full h-full">
                <span class="absolute bottom-0 right-1 text-white font-semibold">{{ key1 }}</span>
            </button>
            <button
                class="h-16 min-w-[100px] m-2 text-white rounded-lg overflow-hidden outline-none text-uppercase bg-purple-500 hover:bg-purple-700 font-semibold"
                @click.prevent="borrarUltimoCaracter">
                Borrar
            </button>
        </div>
        <div class="keys flex justify-center">
            <button
                class="relative h-16 min-w-[70px] m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-cyan-500 hover:bg-cyan-700"
                v-for="key2 in keys2" @click.prevent="disp(key2)">
                <img :src="`/remove/${key2}.png`" alt="" class="w-full h-full">
                <span class="absolute bottom-0 right-1 text-white font-semibold">{{ key2 }}</span>
            </button>
        </div>
        <div class="keys flex justify-center">
            <button
                class="relative h-16 min-w-[70px] m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-cyan-500 hover:bg-cyan-700"
                v-for="key3 in keys3" @click.prevent="disp(key3)">
                <img :src="`/remove/${key3}.png`" alt="" class="w-full h-full">
                <span class="absolute bottom-0 right-1 text-white font-semibold">{{ key3 }}</span>
            </button>
            <button
                class="h-16 min-w-[150px] m-2 text-white rounded-lg overflow-hidden outline-none text-uppercase bg-red-500 hover:bg-red-700 font-semibold"
                @click.prevent="limpiar()">
                <i class="fa-solid fa-trash text-white"></i>
                Limpiar
            </button>
        </div>
        <div class="keys flex justify-center">
            <button
                class="h-16 min-w-[450px] m-2 text-white rounded-lg overflow-hidden outline-none text-uppercase bg-blue-500 hover:bg-blue-700 font-semibold"
                @click.prevent="disp(' ')">
                Espacio
            </button>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            letters: [],
            numeros: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            keys1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            keys2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
            keys3: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
            text: '',
            lineas: [],
        };
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    },
    methods: {
        handleKeyDown(event) {
            this.$nextTick(() => {
                const container = this.$refs.imageContainer;
                container.scrollTop = container.scrollHeight;
            });
            const keyCode = event.keyCode;
            if (keyCode === 32) {
                // Espacio
                this.letters.push(" ");
                event.preventDefault();
                document.body.classList.add('no-scroll');
            } else if (keyCode === 8) {
                // Borrar
                event.preventDefault();
                this.letters.pop();
            } else if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || keyCode === 192) {
                // Letras y numeros
                const key = event.key.toLowerCase();
                this.letters.push(key);
            }

            this.lineas = this.dividirCadena(this.letters.join(''));
        },
        dividirCadena(cadena) {
            const palabras = cadena.split(" ");
            const grupos = [];
            let grupoActual = [];

            palabras.forEach((palabra) => {
                if (grupoActual.join("").length + palabra.length + grupoActual.length <= 30
) {
                    grupoActual = grupoActual.concat(Array.from(palabra));
                    if (grupoActual.length < 30) {
                        grupoActual.push(" ");
                    }
                } else {
                    grupos.push(grupoActual);
                    grupoActual = Array.from(palabra);
                    if (grupoActual.length < 30) {
                        grupoActual.push(" ");
                    }
                }
            });
            grupos.push(grupoActual);
            return grupos;
        },
        handleKeyUp(event) {
            const keyCode = event.keyCode;
            if (keyCode === 32) {
                document.body.classList.remove('no-scroll');
            }
        },
        disp(letter) {
            this.letters.push(letter);
            this.lineas = this.dividirCadena(this.letters.join(''));
        },
        getImagePath(character) {
            if (character == ' ') {
                return '/remove/espacio.jpg';
            }
            return `/remove/${character}.png`;
        },
        borrarUltimoCaracter() {
            if (this.letters.length > 0) {
                this.letters.pop();
                this.lineas = this.dividirCadena(this.letters.join(''));

            }
        },
        limpiar() {
            this.lineas = []
            this.letters = []
        }
    }
};
</script>
<style scoped>
button:active {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.image-container {
    box-shadow: inset -3px -3px 7px #ffffff73, inset 2px 2px 5px rgba(94, 104, 121, 0.288);
}

.no-scroll {
    overflow: hidden;
}
</style>