var http = require("http");
var qs = require("querystring");
var sensor = require('node-dht-sensor');
var port = 9000;
//var sensorvalue = '';

var dhtsensoreturn = function(value) {
  return new Promise((resolve, reject) => {
    console.log('Getting ' + value + '...');
        sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          switch (value) {
            case "Temperature": {
              var sensorvalue = temperature.toFixed(0);
            }
            case "Humidity": {
              var sensorvalue = humidity.toFixed(0);
            }
          }
          console.log('Returning '+ value + ': ' + sensorvalue);
          resolve(sensorvalue);
        }
      });
    }).then(function(data){
      return data
    });
};

http.createServer(function(req, resp) {
  var APIreturn = '';
  var valuetoget = '';
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
        valuetoget = 'Temperature';
      }
      if (req.url === "/humidity") {
        console.log("*******************************************");
        console.log(now + "; Humidity Requested");
        valuetoget = 'Humidity';
      }
    case "POST":
      break;
    default:
      break;
  }
  if (valuetoget != '') {
    Promise.all([dhtsensoreturn(valuetoget)]).then(function (data){
      console.log("Returning:");
      APIreturn = "{\"DateTime\" : \"" + now + "\", \"" + valuetoget + "\": \"" + data[0] + "\"}";
      console.log(APIreturn);
      resp.writeHead(200, {"ContentType": "application/json"});
      resp.write(APIreturn);
      resp.end();
    });
  }
}).listen(port);
