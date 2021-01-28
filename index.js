const express = require("express");
const app = express();
const gplay = require("google-play-scraper").memoized();
var port = process.env.PORT || 8080;
const rateLimit = require("express-rate-limit");
const detail = require("./Routes/detail");

const limiter = rateLimit({
  windowMs: 2000,
  max: 1,
  message: {
    status: "Error",
    message: "We are hosted on free server, please reduce calls.",
  },
});

app.get("/detail", limiter, (req, res) => {
  var pn = req.query.q;
  gplay.app({ appId: pn }).then((data) => {
    detail.doWork(res, data);
  });
});
app.listen(port, () => {
  console.log("Server running on port " + port);
});
