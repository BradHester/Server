var http = require("http");
var qs = require("querystring");
var port = 9000;


http.createServer(function(req, resp) {
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
        resp.write("{\"Temperature\": \"32\"}");
        resp.end();
      }
      if (req.url === "/humidity") {
        resp.writeHead(200, {
          "ContentType": "text/html"
        });
        resp.write("{Temperature}");
        resp.end();
      }
    case "POST":
      break;
    default:
      break;
  }

}).listen(port);
