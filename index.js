const express = require("express");
const app = express();
const gplay = require("google-play-scraper").memoized();
var port = process.env.PORT || 8080;
const rateLimit = require("express-rate-limit");
const detail = require("./Routes/detail");
const download = require("./Routes/download");

const limiter = rateLimit({
  windowMs: 2000,
  max: 1,
  message: {
    status: "Error",
    message: "We are hosted on free server, please reduce calls.",
  },
});
//To get detail of single app
app.get("/detail", limiter, (req, res) => {
  var pn = req.query.q;
  gplay.app({ appId: pn }).then((data) => {
    detail.doWork(res, data);
  });
});
//To search with custom query params
app.get("/search", limiter, (req, res) => {
  var { q, n, l, c, p } = req.query;
  if (n <= 10) {
    gplay
      .search({
        term: q,
        num: n,
        lang: l,
        country: c,
        price: p,
      })
      .then((data) => {
        res.send(data);
      });
  } else res.json({ error: "Count (n) can not exceed above 10..." });
});
//To download apk...
app.get("/download", limiter, (req, res) => {
  download.doWork(req, res);
});
app.listen(port, () => {
  console.log("Server running on port " + port);
});
