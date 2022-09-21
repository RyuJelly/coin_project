const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8000;
const ejs = require("ejs");
const db = require("./lib/db");
const home = require("./lib/home");

app.listen(port, () => {
  console.log(`Connect ${port}~!`);
});

app.set("views", "./views");
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.locals.pretty = true;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {
    coinInitInfo: home.coinInitInfo,
    today: home.today,
    weekAgo: home.weekAgo,
  });
});

app.get("/:coinName", (req, res) => {
  if (
    req.params.coinName != "favicon.ico" &&
    !home.coinNameList.includes(req.params.coinName)
  ) {
    res.status(404).json({
      status: "error",
      error: "페이지를 찾을 수 없습니다!",
    });
    // res.send("404");
  } else if (req.params.coinName != "favicon.ico") {
    if (!req.query.startDate) req.query.startDate = weekAgo;
    if (!req.query.endDate) req.query.endDate = today;

    db.query(
      `select * from ${req.params.coinName} where date>= "${req.query.startDate}" and date <= "${req.query.endDate}"`,
      (err, result) => {
        let addTable = "";

        for (let i = 0; i < result.length; i++) {
          addTable += `
            <tr>
                <td>${result[i].date.toISOString().split("T")[0]}<td>
                <td>${result[i].closeprice}<td>
                <td>${result[i].open}<td>
                <td>${result[i].high}<td>
                <td>${result[i].low}<td>
                <td>${result[i].tradingvolume}<td>
                <td>${result[i].fluctuations}<td>
            </tr>
        `;
        }

        const searchInfo = `
        <table id="coinTable" border="1">
            <tr>
                <td>${req.params.coinName}/KRW</td>
            </tr>
            <tr>
                <td>날짜<td>
                <td>종가<td>
                <td>시가<td>
                <td>최고가<td>
                <td>최저가<td>
                <td>거래량<td>
                <td>변동(%)<td>
            </tr>
            ${addTable}
        </table>
      `;

        res.send(searchInfo);
      }
    );
  }
});
