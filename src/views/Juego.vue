<template>
  <div class="flex justify-center">
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td>
          <div class="power_controls">
            <br />
            <br />
            <table class="power" cellpadding="10" cellspacing="0">
              <tr>
                <th align="center">Poder</th>
              </tr>
              <tr>
                <td
                  width="78"
                  align="center"
                  id="pw3"
                  @click.prevent="powerSelected(3)"
                >
                  Alto
                </td>
              </tr>
              <tr>
                <td align="center" id="pw2" @click.prevent="powerSelected(2)">
                  Medio
                </td>
              </tr>
              <tr>
                <td align="center" id="pw1" @click.prevent="powerSelected(1)">
                  Bajo
                </td>
              </tr>
            </table>
            <br />
            <button
              @click.prevent="startSpin()"
              id="spin_button"
              class="bg-turquesa-500 text-white hover:bg-turquesa-700 h-12 w-12 rounded-full outline-none mr-2"
              :disabled="btnPlay"
            >
              <i class="fa-solid fa-play block"></i>
            </button>
            <button
              class="bg-pink-500 text-white hover:bg-pink-700 h-12 w-12 rounded-full outline-none"
              href="#"
              @click.prevent="resetWheel()"
              :disabled="btnReset"
            >
              <i class="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </td>
        <td
          width="438"
          height="502"
          class="the_wheel"
          align="center"
          valign="center"
        >
          <canvas id="canvas" width="430" height="430">
            <p style="color: white" align="center">
              Sorry, your browser doesn't support canvas. Please try another.
            </p>
          </canvas>
        </td>
      </tr>
    </table>
    <transition name="modal">
      <Modal
        :showModal="showModal"
        @modal-cerrado="resetearModal"
        modalSize="w-1/2"
      >
        <Cronometro :tiempo="20" :pause="pause" />
      </Modal>
    </transition>
  </div>
</template>
<script>
import { categoriesById } from "../datos.js";
import Cronometro from "../components/Cronometro.vue";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Cronometro,
    Modal,
  },
  created() {
    this.categoria = this.$route.params.id;
  },
  mounted() {
    this.segmenSelect();
    this.createWinwheel();
  },
  data() {
    return {
      showModal: false,
      wheelSpinning: false,
      wheelPower: 0,
      theWheel: null,
      categoria: null,
      btnPlay: false,
      btnReset: true,
      pause: false,
      segmentos: [],
      colores: [
        "#FBA51A",
        "#EE5D42",
        "#EB1B79",
        "#D34B9D",
        "#028FC5",
        "#5B52A3",
        "#72C156",
        "#F4EF8A",
      ],
    };
  },
  methods: {
    resetearModal() {
      this.showModal = false;
    },
    createWinwheel() {
      this.theWheel = new Winwheel({
        canvasId: "canvas",
        numSegments: this.numSegments,
        outerRadius: 215,
        textFontSize: 20,
        responsive: true,
        segments: this.segmentos,
        animation: {
          type: "spinToStop",
          duration: 3,
          spins: 8,
          callbackFinished: this.alertPrize,
          soundTrigger: "pin",
        },
        pins: {
          number: 18,
          responsive: true,
        },
      });
    },
    startSpin() {
      if (this.wheelSpinning == false) {
        if (this.wheelPower == 1) {
          this.theWheel.animation.spins = 3;
        } else if (this.wheelPower == 2) {
          this.theWheel.animation.spins = 8;
        } else if (this.wheelPower == 3) {
          this.theWheel.animation.spins = 15;
        }
        this.btnPlay = true;
        this.theWheel.startAnimation();
        this.wheelSpinning = true;
      }
    },
    powerSelected(powerLevel) {
      if (this.wheelSpinning == false) {
        document.getElementById("pw1").className = "";
        document.getElementById("pw2").className = "";
        document.getElementById("pw3").className = "";
        if (powerLevel >= 1) {
          document.getElementById("pw1").className = "pw1";
        }
        if (powerLevel >= 2) {
          document.getElementById("pw2").className = "pw2";
        }
        if (powerLevel >= 3) {
          document.getElementById("pw3").className = "pw3";
        }
        this.wheelPower = powerLevel;
      }
    },
    resetWheel() {
      this.theWheel.stopAnimation(false);
      this.theWheel.rotationAngle = 0;
      this.theWheel.draw();
      document.getElementById("pw1").className = "";
      document.getElementById("pw2").className = "";
      document.getElementById("pw3").className = "";
      this.btnPlay = false;
      this.btnReset = true;
      this.wheelSpinning = false;

      this.segmenSelect();
      return false;
    },
    alertPrize(indicatedSegment) {
      this.btnReset = false;
      const premioGanado = this.datosCategoria.datos.find((dato) => {
        return (
          dato.name.split("(")[0].split("/")[0].replace(" ", "\n") ===
          indicatedSegment.text
        );
      });
      if (premioGanado) {
        this.showModal = true;
        alert("You have won " + indicatedSegment.text);
      } else {
        alert("No prize won.");
      }
    },
    obtenerNombresAleatorios(datos, cantidad) {
      const nombres = datos.map((dato) => dato.name);
      const nombresAleatorios = [];

      for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * nombres.length);
        const nombreAleatorio = nombres.splice(indiceAleatorio, 1)[0];
        nombresAleatorios.push(nombreAleatorio);
      }
      return nombresAleatorios;
    },
    segmenSelect() {
      const nombresAleatorios = this.obtenerNombresAleatorios(
        this.datosCategoria.datos,
        this.numSegments
      );
      this.segmentos = nombresAleatorios.map((nombre, index) => {
        return {
          fillStyle: this.colores[index],
          text: nombre.split("(")[0].split("/")[0].replace(" ", "\n"),
        };
      });
      this.createWinwheel();
    },
  },
  computed: {
    datosCategoria() {
      return categoriesById(this.categoria);
    },
    numSegments() {
      return this.datosCategoria.datos.length >= 6
        ? 6
        : this.datosCategoria.datos.length;
    },
    rutaImage() {
      if (this.categoria < 21) {
        return "/modulo_1/";
      } else if (this.categoria > 20 && this.categoria < 42) {
        return "/modulo_2/";
      } else if (this.categoria > 41 && this.categoria < 60) {
        return "/modulo_3/";
      } else {
        return "/modulo_4/";
      }
    },
  },
};
</script>
