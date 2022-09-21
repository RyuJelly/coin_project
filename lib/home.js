const db = require("./db");

exports.today = new Date().toISOString().split("T")[0];
exports.weekAgo = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() - 7
)
  .toISOString()
  .split("T")[0];

function searchCoin() {
  return new Promise((resolve, reject) => {
    db.query("show table status", (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
}

async function initInfo() {
  let coinInitInfo;
  let coinNameList = [];

  await searchCoin().then((val) => (coinInitInfo = val)).catch(console.log);

  for (let i = 0; i < coinInitInfo.length; i++) {
    coinNameList.push(coinInitInfo[i].Name);
  }

  exports.coinInitInfo = coinInitInfo;
  exports.coinNameList = coinNameList;
}

initInfo();