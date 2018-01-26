var http = require("http");
var port = 900;

http.createserver(function(req,resp){
  switch (req.method) {
      case "GET":
        resp.writehead(200, ["ContentType": "text/html" }]);
        resp.write("<html><head><title>Home</title></head><body>Brad's Test</body></html>")

  }

});
