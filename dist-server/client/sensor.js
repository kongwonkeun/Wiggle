"use strict";

//
var G_sensor;
var G_logger;

function Sensor() {
  this.host = "ws://localhost:5331/write_anything_here.php";
  this.socket;
  this.buffer = 0;
  this.data = 0;
  this.count = 0;
  this.speed = 0;
  this.dir = 0;
}

;
Sensor.prototype = {
  connect: function connect() {
    G_sensor = this;
    G_logger = document.getElementById("sensor-log");

    try {
      this.socket = new WebSocket(this.host);
      G_logger.innerHTML = "socket new = " + G_sensor.socket.readyState + "<br/>";

      this.socket.onopen = function () {
        G_logger.innerHTML = "socket open = " + G_sensor.socket.readyState + "<br/>";
      };

      this.socket.onmessage = function (msg) {
        var buf = new String(msg.data);
        var str = buf.split('V');

        if (str[0].length != 9) {
          return;
        }

        var d = str[0].split('D');

        if (isNaN(d[0]) || isNaN(d[1])) {
          return;
        }

        G_sensor.speed = d[0];
        G_sensor.dir = d[1];
        G_sensor.count += 1;
        G_log.innerHTML = "cnt: " + G_sensor.count + "<br/>";
        G_log.innerHTML += "speed: " + G_sensor.speed + "<br/>";
        G_log.innerHTML += "dir: " + G_sensor.dir + "<br/>";
        G_log.innerHTML += "f: " + window.W_f + "<br/>";
        window.W_speed = G_sensor.speed;
        window.W_dir = 14 - G_sensor.dir; // 14 is the center of dir range (-: left, 0: center, +: right)
      };

      this.socket.onclose = function () {
        G_logger.innerHTML = "socket close = " + G_sensor.socket.readyState + "<br/>";
        this.socket.close();
      };
    } catch (e) {
      G_logger.innerHTML = "socket error = " + e + "<br/>";
    }
  }
};
module.exports = Sensor; //
//# sourceMappingURL=sensor.js.map