var http = require("http");
var qs = require("querystring");
var sensor = require('node-dht-sensor');

var port = 9000;


http.createServer(function(req, resp) {
const now = new Date();

  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        resp.writeHead(200, {
          "ContentType": "text/html"
        });
        resp.write("<html><head><title>Home</title></head><body>Brad's Test</body></html>");
        resp.end();
      }

      if (req.url === "/temperature") {
        resp.writeHead(200, {
          "ContentType": "text/html"
        });
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
           resp.write("{\"DateTime\" : \"" + now + "\", \"Temperature\": \"" + temperature + "\"}");
           resp.end();
           }
        });
      }

      if (req.url === "/humidity") {
        resp.writeHead(200, {
          "ContentType": "text/html"
        });
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
           resp.write("{\"DateTime\" : \"" + now + "\", \"Humidity\": \"" + humidity + "\"}");
           resp.end();
           }
        });
      }

    case "POST":
      break;
    default:
      break;
  }

}).listen(port);
