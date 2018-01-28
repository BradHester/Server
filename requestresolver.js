var http = require("http");
var qs = require("querystring");
var sensor = require('node-dht-sensor');

var port = 9000;

var dhtsensoreturn = function(value) {
  return new Promise((resolve, reject) => {
    console.log('Getting ' + value + '...');
        sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          switch (value) {
            case "Temperature": {
              var response = temperature.toFixed(0);
            }
            case "Humidity": {
              var response = humidity.toFixed(0);
            }
          }
          console.log('Returning '+ value + ': ' + response);
          return response
        }
      });
    }).then(function(data){
      return data
    });
};

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
        console.log("*******************************************");
        console.log(now + "; Temperature Requested");
        resp.writeHead(200, {
          "ContentType": "application/json"
        });
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
           var temperaturereturn = "{\"DateTime\" : \"" + now + "\", \"Temperature\": \"" + dhtsensoreturn('Temperature') + "\"}";
           console.log("Returning:");
           console.log(temperaturereturn);
           resp.write(temperaturereturn);
           resp.end();
           }
        });
      }

      if (req.url === "/humidity") {
        console.log("*******************************************");
        console.log(now + "; Humidity Requested");
        resp.writeHead(200, {
          "ContentType": "application/json"
        });
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
           var humidityreturn = "{\"DateTime\" : \"" + now + "\", \"Humidity\": \"" + humidity + "\"}";
           console.log("Returning:");
           console.log(humidityreturn);
           resp.write(humidityreturn);
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
