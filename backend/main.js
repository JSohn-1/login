const student = require('./modules/student.js');
const database = require('./modules/database.js');
const results = require('./modules/results.js');
const time = require('./modules/time.js');
const http = require("http");
const url = require("url");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    let q = url.parse(req.url, true).query;

    let success = new results(true, 40, "none");

    if(q.name == undefined){
        success = new results(false, 10, "No name given");
    }

    if(q.id == undefined){
        success = new results(false, 20, "No id given");
    }

    if(q.grade == undefined){
      success = new results(false, 30, "No grade given");
    }

    if(success.success === true){
      const st = new student(q.id, q.name, q.grade, time.getTime());
      const url = req.url.split("?")[0];

      if(url === "/entry/"){
        database.enter(st);
      }else if (url === "/exit/"){
        database.exit(st);
      }else if (url === "/flush/"){
        database.createFile();
      }

      console.log(url);
    }

    res.end(
      JSON.stringify(
        {
          success: success.success,
          reason: success.reason,
          code: success.code,
          login: q.login
        },
      )
    );
  })
  .listen(8080);
