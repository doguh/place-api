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
      "#ffffff", // white
      "#222222", // black
      "#e4e4e4", // lightgrey
      "#888888", // darkgrey
      "#e50000", // red
      "#a06a42", // brown
      "#e59500", // orange
      "#e5d900", // yellow
      "#94e044", // lightgreen
      "#02be01", // green
      "#00d3dd", // lightblue
      "#0083c7", // darkblue
      "#0000ea", // blue
      "#820080", // purple
      "#cf6ee4", // lightpurple
      "#ffa7d1" // pink
    ]
  },
  db: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/place",
    name: process.env.DB_NAME || "place"
  },
  logEvents: process.env.LOG_EVENTS === "true",
  trustProxy: process.env.TRUST_PROXY || false
};
