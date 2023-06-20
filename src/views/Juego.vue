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
            <img
              id="spin_button"
              src="/winwheel/spin_off.png"
              alt="Spin"
              @click.prevent="startSpin()"
            />
            <br /><br />
            &nbsp;&nbsp;<a href="#" @click.prevent="resetWheel()">Play Again</a
            ><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(reset)
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
  </div>
</template>
<script>
export default {
  mounted() {
    this.theWheel = new Winwheel({
      canvasId: "canvas",
      numSegments: 8,
      outerRadius: 208,
      textFontSize: 28,
      responsive: true,
      segments: [
        { fillStyle: "#eae56f", text: "Prize 1" },
        { fillStyle: "#89f26e", text: "Prize 2" },
        { fillStyle: "#7de6ef", text: "Prize 3" },
        { fillStyle: "#e7706f", text: "Prize 4" },
        { fillStyle: "#eae56f", text: "Prize 5" },
        { fillStyle: "#89f26e", text: "Prize 6" },
        { fillStyle: "#7de6ef", text: "Prize 7" },
        { fillStyle: "#e7706f", text: "Prize 8" },
      ],
      animation: {
        type: "spinToStop",
        duration: 15,
        spins: 8,
        callbackFinished: this.alertPrize,
        callbackSound: this.playSound,
        soundTrigger: "pin",
      },
      pins: {
        number: 16,
        responsive: true,
      },
    });
  },
  data() {
    return {
      wheelSpinning: false,
      wheelPower: 0,
      theWheel: null,
      audio: new Audio("/winwheel/tick.mp3"),
    };
  },
  methods: {
    startSpin() {
      if (this.wheelSpinning == false) {
        if (this.wheelPower == 1) {
          this.theWheel.animation.spins = 3;
        } else if (this.wheelPower == 2) {
          this.theWheel.animation.spins = 8;
        } else if (this.wheelPower == 3) {
          this.theWheel.animation.spins = 15;
        }
        document.getElementById("spin_button").src = "/winwheel/spin_off.png";
        document.getElementById("spin_button").className = "";
        this.theWheel.startAnimation();
        this.wheelSpinning = true;
      }
    },
    alertPrize(indicatedSegment) {
      alert("You have won " + indicatedSegment.text);
    },
    playSound() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.play();
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
        document.getElementById("spin_button").src = "/winwheel/spin_on.png";
        document.getElementById("spin_button").className = "clickable";
      }
    },
    resetWheel() {
      this.theWheel.stopAnimation(false);
      this.theWheel.rotationAngle = 0;
      this.theWheel.draw();
      document.getElementById("pw1").className = "";
      document.getElementById("pw2").className = "";
      document.getElementById("pw3").className = "";

      this.wheelSpinning = false;
      return false;
    },
  },
};
</script>
