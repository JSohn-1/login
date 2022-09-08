const student = require('./modules/student.js');
const database = require('./modules/database.js');
const results = require('./modules/results.js');
const time = require('./modules/time.js');
const http = require("http");
const url = require("url");
const constants = require('./modules/constants.js');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 0 * * *', () => {
  if(database.s.length > 0){
    database.createFile(true);
    database.delete();
    database.s = [];
  }
})

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/json" });

    let q = url.parse(req.url, true).query;
    const url = req.url.split("?")[0];
    let success = new results(true, 40, "none");

    if(url == "/gen/"){
      success.reason = database.generate();

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
    }


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


      if(url === "/entry/"){
        success = database.enter(st);
      }else if (url === "/exit/"){
        success = database.exit(st);
      }else if (url === "/flush/"){
        success = database.createFile(q.write);
        database.s = [];
      }
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
  .listen(constants.PORT);
