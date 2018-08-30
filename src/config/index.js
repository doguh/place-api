module.exports = {
  server: {
    port: process.env.PORT || 80
  },
  canvas: {
    width: process.env.CANVAS_WIDTH || 256,
    height: process.env.CANVAS_HEIGHT || 256,
    file: process.env.CANVAS_FILE || "./canvas.buff"
  }
};
