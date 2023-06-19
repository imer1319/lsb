<template>
  <div>
    <canvas id="myCanvas" width="880" height="300">
      Canvas not supported, use another browser.
    </canvas>
  </div>
</template>
<script>
export default {
  mounted() {
    const winwheelInstance = new Winwheel({
      canvasId: "myCanvas",
      numSegments: 4,
      segments: [
        { fillStyle: "#eae56f", text: "Segment 1" },
        { fillStyle: "#89f26e", text: "Segment 2" },
        { fillStyle: "#7de6ef", text: "Segment 3" },
        { fillStyle: "#e7706f", text: "Segment 4" },
      ],
    });

    this.winAnimation();
    this.drawColourTriangle();
  },
  methods: {
    winAnimation() {},
    drawColourTriangle() {
      tx.strokeStyle = "#000000"; // Set line colour.
      tx.fillStyle = "aqua"; // Set fill colour.
      tx.lineWidth = 2;
      tx.beginPath(); // Begin path.
      tx.moveTo(175, 20); // Move to initial position.
      tx.lineTo(235, 20); // Draw lines to make the shape.
      tx.lineTo(205, 80);
      tx.lineTo(176, 20);
      tx.stroke(); // Complete the path by stroking (draw lines).
      tx.fill();
    },
  },
};
</script>
