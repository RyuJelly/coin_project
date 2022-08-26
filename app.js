const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8000;
let ejs = require("ejs");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "192.168.242.236",
  user: "root",
  password: "0411",
  database: "mydb",
});

app.listen(port, () => {
  console.log(`Connect ${port}~!`);
});

db.connect();

app.set("views", "./views");
app.set("view engine", "ejs");
app.locals.pretty = true;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const list = db.query("show table status", (err, list) => {
    let coin_list = [];
    let today = new Date().toISOString().split("T")[0];
    let weekAgo = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 7
    )
      .toISOString()
      .split("T")[0];

    for (let i = 0; i < list.length; i++) {
      coin_list.push(list[i].Name);
    }
    res.render("index", {
      coin_list: coin_list,
      today: today,
      weekAgo: weekAgo,
    });
  });
});

app.get("/btc", (req, res) => {
  //   db.query("select * from btc where date>= ");
});

app.post("/ppost", (req, res) => {
  console.log(req.body.startDate);
  console.log(req.body.endDate);
  console.log(req.body.text);
  db.query(
    `select * from btc where date>= "${req.body.startDate}" and date <= "${req.body.endDate}"`,
    (err, result) => {
      res.send(result);
    }
  );
});
