/***********************************************************
Request Resolver:

***********************************************************/
var http = require("http");
var qs = require("querystring");
var sensor = require('node-dht-sensor');
var port = 9000;

//declare function connecting to DHT sensor
var dhtsensoreturn = function(value) {
  return new Promise((resolve, reject) => {
    console.log('Getting ' + value + '...');
        //Read Sensor HDT11 on pin 4
        sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          switch (value) {
            case "Temperature": {
              var sensorvalue = temperature.toFixed(0);
              break;
            }
            case "Humidity": {
              var sensorvalue = humidity.toFixed(0);
              break;
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

//Determine reading based on URL provided
  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        resp.writeHead(200, {
          "ContentType": "text/html"
        });
        resp.write("<html><head><title>Home</title></head><body>Brad's Test</body></html>");
        resp.end();
      }
      //Get Temperature requested
      if (req.url === "/temperature") {
        console.log("*******************************************");
        console.log(now + "; Temperature Requested");
        valuetoget = 'Temperature';
        break;
      }
      //Get Humidity Requested
      if (req.url === "/humidity") {
        console.log("*******************************************");
        console.log(now + "; Humidity Requested");
        valuetoget = 'Humidity';
        break;
      }

    case "POST":
      break;

      //If nothing provided
    default:
      break;
  }

  //If Temperature or Humidity is selected, call function to get the value requested
  if (valuetoget != '') {
    Promise.all([dhtsensoreturn(valuetoget)]).then(function (data){
      console.log("Returning:");
    //  if(valuetoget = 'Temperature') {
    //    APIreturn = JSON.stringify({"DateTime" :  now , "Temperature": data[0]});
    //  }
    //  else {
    //    APIreturn = JSON.stringify({"DateTime" :  now , "Humidity": data[0]});
  //    }
      APIreturn = "{\" DateTime\" :  \"" + now + "\", \"Humidity\": \"" + data[0] + "\"}";
      console.log(APIreturn);
      resp.writeHead(200, {"ContentType": "application/json"});
      resp.write(APIreturn);
      resp.end();
    });
  }
}).listen(port);
