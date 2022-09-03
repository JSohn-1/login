import student from database;


var http = require("http");
var dt = require("./modules/dateTime");
var url = require("url");
var util = require("./modules/utils");



http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    var q = url.parse(req.url, true).query;

    var success = {};
    success['success'] = true;
    success['code'] = 40;
    success['reason'] = "none";

    if(q.name == undefined){
        success['success'] = false;
        success['code'] = 10
        success['reason'] = 'No name given';

    }

    if(q.username == undefined){
        success['success'] = false;
        success['code'] = 20;
        success['reason'] = "No username given";

    }

    if(success['success'] === true){
        if(q.login){

        }
    }

    res.end(
      JSON.stringify(
        {
          success: success["success"],
          reason: success["reason"],
          code: success["code"],
          login: q.login
        },
      )
    );
  })
  .listen(8080);
