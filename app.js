const express = require("express");
const app = express();
const port = 8000;
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
app.set("view engine", "pug");
app.locals.pretty = true;
app.use(express.static("public"));

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

    console.log(`today: ${today}`);
    console.log(`week: ${weekAgo}`);

    for (let i = 0; i < list.length; i++) {
      coin_list.push(list[i].Name);
    }
    res.render("temp", {
      coin_list: coin_list,
      today: today,
      weekAgo: weekAgo,
    });
  });
});

app.get("/btc", (req, res) => {
  db.query("select * from btc where date>= ");
});
