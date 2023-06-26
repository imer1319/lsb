<template>
  <div class="flex flex-col justify-center rounded-lg pb-12 pl-16 lg:pl-32">
    <div class="flex justify-center mb-2">
      <button
        @click.prevent="activeShowTeclas"
        class="px-3 py-2 bg-turquesa-500 hover:bg-turquesa-700 text-white rounded-md outline-none"
      >
        <i
          :class="[showTeclas ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash']"
        ></i>
      </button>
    </div>
    <div
      class="image-container w-full mb-[20px] p-2 select-none overflow-hidden dark:bg-gray-800 rounded-lg"
      :class="showTeclas ? 'h-[260px]' : 'h-[460px]'"
    >
      <div class="overflow-y-auto h-full" ref="imageContainer">
        <div
          class="flex flex-wrap"
          v-for="(linea, index) in lineas"
          :key="index"
        >
          <div
            class="lg:w-16 lg:h-20 w-10 h-12 flex flex-wrap"
            v-for="image in linea"
            :key="image"
          >
            <img :src="getImagePath(image)" :alt="image" />
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="showTeclas">
        <div class="keys flex justify-center">
          <button
            :id="numero"
            class="cardImages relative lg:h-12 h-11 lg:w-16 w-12 m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-violet-800 hover:bg-violet-950"
            v-for="numero in numeros"
            @click.prevent="disp(numero)"
          >
            <img :src="`/remove/${numero}.png`" alt="" class="w-full h-full" />
            <span
              class="absolute bottom-0 right-1 text-white font-semibold text-lg"
              >{{ numero }}</span
            >
          </button>
        </div>
        <div class="keys flex justify-center">
          <button
            :id="key1"
            class="cardImages relative lg:h-12 h-11 lg:w-16 w-12 m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-blue-800 hover:bg-blue-950"
            v-for="key1 in keys1"
            @click.prevent="disp(key1)"
          >
            <img :src="`/remove/${key1}.png`" alt="" class="w-full h-full" />
            <span
              class="absolute bottom-0 right-1 text-white font-semibold text-lg"
              >{{ key1 }}</span
            >
          </button>
          <button
            class="cardImages lg:h-12 h-11 lg:w-32 w-20 m-2 text-white rounded-lg overflow-hidden outline-none text-uppercase bg-pink-600 hover:bg-pink-800 font-semibold"
            @click.prevent="borrarUltimoCaracter"
          >
            <i class="fa-solid fa-delete-left text-white text-lg mr-1"></i>
            <span class="hidden lg:inline">Borrar</span>
          </button>
        </div>
        <div class="keys flex justify-center">
          <button
            :id="key2"
            class="cardImages relative lg:h-12 h-11 lg:w-16 w-12 m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-blue-800 hover:bg-blue-950"
            v-for="key2 in keys2"
            @click.prevent="disp(key2)"
          >
            <img :src="`/remove/${key2}.png`" alt="" class="w-full h-full" />
            <span
              class="absolute bottom-0 right-1 text-white font-semibold text-lg"
              >{{ key2 }}</span
            >
          </button>
        </div>
        <div class="keys flex justify-center">
          <button
            :id="key3"
            class="cardImages relative lg:h-12 h-11 lg:w-16 w-12 m-2 rounded-lg overflow-hidden outline-none text-uppercase bg-blue-800 hover:bg-blue-950"
            v-for="key3 in keys3"
            @click.prevent="disp(key3)"
          >
            <img :src="`/remove/${key3}.png`" alt="" class="w-full h-full" />
            <span
              class="absolute bottom-0 right-1 text-white font-semibold text-lg"
              >{{ key3 }}</span
            >
          </button>
          <button
            class="cardImages h-11 w-24 lg:w-32 lg:h-12 m-2 text-white rounded-lg overflow-hidden outline-none text-uppercase bg-red-600 hover:bg-red-700 font-semibold"
            @click.prevent="limpiar()"
          >
            <i class="fa-solid fa-trash text-white mr-1"></i>
            <span class="hidden lg:inline">Limpiar</span>
          </button>
        </div>
        <div class="keys flex justify-center">
          <button
            id="espacio"
            class="cardImages h-11 w-[250px] lg:h-12 lg:w-[320px] m-2 text-white rounded-lg overflow-hidden outline-none text-uppercase bg-turquesa-500 hover:bg-turquesa-700 font-semibold"
            @click.prevent="disp(' ')"
          >
            Espacio
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      letters: [],
      numeros: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      keys1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      keys2: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
      keys3: ["z", "x", "c", "v", "b", "n", "m"],
      text: "",
      lineas: [],
      showTeclas: true,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  },
  methods: {
    handleKeyDown(event) {
      if (this.showTeclas) {
        this.$nextTick(() => {
          const container = this.$refs.imageContainer;
          container.scrollTop = container.scrollHeight;
        });
        const keyCode = event.keyCode;
        if (keyCode === 32) {
          // Espacio
          const key = " ";
          if (this.letters[this.letters.length - 1] !== " ") {
            this.letters.push(key);
          }
          this.animateButton(key);
          event.preventDefault();
          document.body.classList.add("no-scroll");
        } else if (keyCode === 8) {
          // Borrar
          event.preventDefault();
          this.letters.pop();
        }
        if (keyCode === 13) {
          // Enter
          event.preventDefault();
        } else if (
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 65 && keyCode <= 90) ||
          keyCode === 192
        ) {
          // Letras y numeros
          const key = event.key.toLowerCase();
          this.letters.push(key);
          this.animateButton(key);
        }

        this.lineas = this.dividirCadena(this.letters.join(""));
      }
    },
    dividirCadena(cadena) {
      const palabras = cadena.split(" ");
      const grupos = [];
      let grupoActual = [];
      palabras.forEach((palabra) => {
        if (grupoActual.join("").length + palabra.length <= 15) {
          grupoActual = grupoActual.concat(Array.from(palabra));
          if (grupoActual.length < 15) {
            grupoActual.push(" ");
          }
        } else {
          grupos.push(grupoActual);
          grupoActual = Array.from(palabra);
          if (grupoActual.length < 15) {
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
        document.body.classList.remove("no-scroll");
      }
    },
    disp(letter) {
      this.$nextTick(() => {
        const container = this.$refs.imageContainer;
        container.scrollTop = container.scrollHeight;
      });
      this.letters.push(letter);
      this.lineas = this.dividirCadena(this.letters.join(""));
      this.animateButton(letter);
    },
    animateButton(character) {
      if (character === " ") {
        character = "espacio";
      }
      let button = document.getElementById(character);
      button.classList.add("animate__animated", "animate__shakeY");
      setTimeout(() => {
        button.classList.remove("animate__animated", "animate__shakeY");
      }, 400);
    },
    getImagePath(character) {
      if (character == " ") {
        return "/remove/espacio.png";
      }
      return `/remove/${character}.png`;
    },
    borrarUltimoCaracter() {
      if (this.letters.length > 0) {
        this.letters.pop();
        this.lineas = this.dividirCadena(this.letters.join(""));
      }
    },
    limpiar() {
      this.lineas = [];
      this.letters = [];
    },
    activeShowTeclas(){
      this.showTeclas = !this.showTeclas
    }
  },
};
</script>
<style scoped>
button:active {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.image-container {
  box-shadow: inset -3px -3px 7px #ffffff73,
    inset 2px 2px 5px rgba(94, 104, 121, 0.288);
}

.no-scroll {
  overflow: hidden;
}

.cardImages {
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.08),
    -3px -2px 3px rgba(255, 255, 255, 0.2),
    2px 2px 2px rgba(0, 0, 0, 0.08) inset;
}
</style>
