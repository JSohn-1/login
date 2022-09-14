const student = require("./modules/student");
const database = require("./modules/database");
const results = require("./modules/results");
const time = require("./modules/time.js");
const http = require("http");
const url = require("url");
const constants = require("./modules/constants");
const schedule = require("node-schedule");

const rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 59;
rule.tz = "America/Los_Angeles";

const job = schedule.scheduleJob(rule, () => {
  console.log("auto");
  if (database.s.length > 0) {
    database.createFile(true);
  }
  database.s = [];
});

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/json" });

    let q = url.parse(req.url, true).query;
    const u = req.url.split("?")[0];
    let success = new results(true, 40, "none");
    if (u == "/gen/") {
      success.reason = database.generate();
      res.end(
        JSON.stringify([
          {
            success: success.success,
            reason: "success",
            code: success.code,
          },
          {
            output: success.reason,
          },
        ])
      );
    } else if (u == "/next/") {
      res.end(
        JSON.stringify([
          {
            success: success.success,
            reason: success.reason,
            code: success.code,
          },
          {
            output: job.nextInvocation(),
          },
        ])
      );
    } else if (u == "/entry/") {
      if (q.name == undefined) {
        success = new results(false, 10, "No name given");
      }

      if (q.id == undefined) {
        success = new results(false, 20, "No id given");
      }

      if (q.grade == undefined) {
        success = new results(false, 30, "No grade given");
      }

      if (success.success === true) {
        const st = new student(q.id, q.name, q.grade, time.getTime());
        success = database.enter(st);
      }

      res.end(
        JSON.stringify({
          success: success.success,
          reason: success.reason,
          code: success.code,
          login: q.login,
        })
      );
    } else if (u == "/exit/") {
      if (q.name == undefined) {
        success = new results(false, 10, "No name given");
      }

      if (q.id == undefined) {
        success = new results(false, 20, "No id given");
      }

      if (q.grade == undefined) {
        success = new results(false, 30, "No grade given");
      }

      if (success.success === true) {
        const st = new student(q.id, q.name, q.grade, time.getTime());
        success = database.exit(st);
      }

	  res.end(
        JSON.stringify({
          success: success.success,
          reason: success.reason,
          code: success.code,
          login: q.login,
        })
      );
    } else if (u == "/flush/") {
      success = database.createFile();
      database.s = [];

      res.end(
        JSON.stringify({
          success: success.success,
          reason: success.reason,
          code: success.code,
          login: q.login,
        })
      );
    } else {
      success = new success(false, "Unknown method: " + u, 50);

      res.end(
        JSON.stringify({
          success: success.success,
          reason: success.reason,
          code: success.code,
          login: q.login,
        })
      );
    }
  })
  .listen(constants.PORT);
