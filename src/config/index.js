module.exports = {
  server: {
    port: process.env.PORT || 9000
  },
  canvas: {
    width: process.env.CANVAS_WIDTH || 256,
    height: process.env.CANVAS_HEIGHT || 256,
    file: process.env.CANVAS_SAVE_FILE || "./canvas.buff",
    saveThrottle: process.env.CANVAS_SAVE_THROTTLE || 5000,
    colors: [
      "#FFFFFF",
      "#000000",
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF"
    ]
  }
};
