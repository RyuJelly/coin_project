// module.exports = {
//     addCoinList:function() {
//         const listArea = document.getElementById("coinSelect");
//         const coinInfo = <%- JSON.stringify(coin_list) %>;

//         for (let i = 0; i < coinInfo.length; i++) {
//             const option = document.createElement("option");
//             const coinName = coinInfo[i].Name;

//             option.setAttribute("value", coinName);
//             option.innerHTML = coinName;

//             listArea.appendChild(option);
//         }

//     }
// }
// function addCoinList() {
//             const listArea = document.getElementById("coinSelect");
//             const coinInfo = <%- JSON.stringify(coin_list) %>;

//             for (let i = 0; i < coinInfo.length; i++) {
//                 const option = document.createElement("option");
//                 const coinName = coinInfo[i].Name;

//                 option.setAttribute("value", coinName);
//                 option.innerHTML = coinName;

//                 listArea.appendChild(option);
//             }

//         }
