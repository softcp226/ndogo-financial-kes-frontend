


 const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/signin.html";
};

const createAndAppendElement = (element) => {
  console.log(element);
  // const section = document.createElement("section");
  // section.className = "table-list-credit";

  //   const tr_dH4 = document.createElement("h4");
  // const ltH4 = document.createElement("h4");
  //   let refH4 = document.createElement("h4");
  //   let srH4 = document.createElement("h4");
  //   let dnH4 = document.createElement("h4");
  //   let dtH4 = document.createElement("h4");
  //   let ctH4 = document.createElement("h4");
  //   let SSH4 = document.createElement("h4");
  // let TDH4 = document.createElement("h4");
  // let REFH4 = document.createElement("h4");
  // let DBH4 = document.createElement("h4");
  // let CDH4 = document.createElement("h4");
  // let SSH4 = document.createElement("h4");

  // TDH4.innerHTML = element.transaction_date;
  // REFH4.innerHTML = element.plan_number;
  // DBH4.innerHTML = element.debit || "";
  // CDH4.innerHTML = element.credit || "";
  // SSH4.innerHTML = element.status;

  // element.status == "failed"
  //   ? (SSH4.className = "status-fail")
  //   : element.status == "pending"
  //   ? (SSH4.className = "status-pending")
  //   : (SSH4.className = "status-success");
  // section.append(TDH4, REFH4, DBH4, CDH4, SSH4);

  const figure = document.createElement("figure");
  figure.className = "charts-figure";
  
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
const plan_P = document.createElement("p");
const date_P = document.createElement("p");

const amount_P = document.createElement("p");
const status_P = document.createElement("p");

plan_P.innerHTML = `${element.plan_name}`;
plan_P.className = "fw-bold";
date_P.innerHTML = ` ${element.transaction_date}`;
amount_P.innerHTML = `KSH${element.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;

amount_P.className = "fw-bold";
status_P.innerHTML = "Running...";
status_P.className = "text-success";
div1.append(plan_P, date_P);
div2.append(amount_P, status_P);
figure.append(div1, div2);
  document.querySelector(".history-container").append(figure);
};

const shape_result = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
  // const section = createElement("section");
  // section.className = "table-list-credit";
  // let h41 = createElement("h4");
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      // "http://localhost:5000/api/user/transactions/fetch",
      "https://crescentpips-backend.glitch.me/api/user/investments/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);

    shape_result(result.message);

    // document.querySelector(
    //   "#balance"
    // ).innerHTML = `**Available Balance= $${result.user_balance
    //   .toString()
    //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**`;
  } catch (err) {
    alert(err.message);
    // document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
