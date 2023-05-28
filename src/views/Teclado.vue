<template>
    <div class="wrapper w-[100%] mx-auto rounded-lg px-12">
        <div class="image-container h-[260px] mb-[20px] select-none">
            <div class="flex flex-wrap justify-center">
                <img class="w-20 h-24" v-for="letter in letters" :src="getImagePath(letter)" :key="letter" :alt="letter">
            </div>
        </div>
        <div class="keys flex justify-center">
            <button class="h-16 min-w-[70px] p-1 m-2 rounded-sm outline-none text-uppercase bg-[#dde1e7]"
                v-for="key1 in numeros" @click.prevent="disp(key1)">
                <img :src="`/teclado/${key1}.jpg`" alt="" class="w-full h-full">
            </button>
        </div>
        <div class="keys flex justify-center">
            <button class="h-16 min-w-[70px] p-1 m-2 rounded-sm outline-none text-uppercase bg-[#dde1e7]"
                v-for="key1 in keys1" @click.prevent="disp(key1)">
                <img :src="`/teclado/${key1}.jpg`" alt="" class="w-full h-full">
            </button>
            <button class="h-16 min-w-[100px] p-1 m-2 rounded-sm outline-none text-uppercase bg-[#dde1e7] font-semibold"
                @click.prevent="borrarUltimoCaracter">
                Borrar
            </button>
        </div>
        <div class="keys flex justify-center">
            <button class="h-16 min-w-[70px] p-1 m-2 rounded-sm outline-none text-uppercase bg-[#dde1e7]"
                v-for="key2 in keys2" @click.prevent="disp(key2)">
                <img :src="`/teclado/${key2}.jpg`" alt="" class="w-full h-full">
            </button>
        </div>
        <div class="keys flex justify-center">
            <button class="h-16 min-w-[70px] p-1 m-2 rounded-sm outline-none text-uppercase bg-[#dde1e7]"
                v-for="key3 in keys3" @click.prevent="disp(key3)">
                <img :src="`/teclado/${key3}.jpg`" alt="" class="w-full h-full">
            </button>
        </div>
        <div class="keys flex justify-center">
            <button class="h-16 min-w-[500px] p-1 m-2 rounded-sm outline-none text-uppercase bg-[#dde1e7] font-semibold"
                @click.prevent="disp(' ')">Espacio</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            letters: [],
            numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            keys1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            keys2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
            keys3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
        };
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    methods: {
        handleKeyDown(event) {
            const keyCode = event.keyCode;
            if (keyCode === 32) {
                this.letters.push(' ');
            }
            if (keyCode === 8) {
                event.preventDefault();
                this.letters.pop();
            }
            if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90)) {
                const key = event.key.toLowerCase();
                this.letters.push(key);
            }
        },
        disp(letter) {
            this.letters.push(letter);
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
            }
        },
    }
};
</script>
<style scoped>
.wrapper {
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
}

.wrapper .keys button:active {
    box-shadow: inset -3px -3px 7px #ffffff73, inset 2px 2px 5px rgba(94, 104, 121, 0.288);
}

.image-container {
    overflow-y: scroll;
    white-space: pre-wrap;
    pointer-events: none;
    border: none;
    outline: none;
    resize: none;
    padding: 10px 15px;
    box-shadow: inset -3px -3px 7px #ffffff73, inset 2px 2px 5px rgba(94, 104, 121, 0.288);
}</style>