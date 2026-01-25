var color = "red";
let prev_percentage;
let new_percentage;

// const setColor = () => {
//   // const percentage_view = document.querySelector("#percentage_view").innerHTML;
//   // color = "red";
//   // prev_percentage = parseInt(percentage_view);
//   // new_percentage = parseInt(percentage_view);
//   // if(new_percentage ==prev_percentage){
//   // }else{
//   // }
//   // color = "red";

//   if (color == "red") {
//     color = "green";
//   } else {
//     color = "red";
//   }

//   document.querySelector("#percentage_view").style.color = color;
// };
// function generate_percentage() {
//   return Math.random() * (12 - 1) + 1;
// }



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
  window.location.replace("/signin.html");
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
  // REFH4.innerHTML = element.refrence_number;
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
const refrence_P = document.createElement("p");
const date_P = document.createElement("p");

const amount_P = document.createElement("p");
const status_P = document.createElement("p");

refrence_P.innerHTML = `${element.full_name}`;
refrence_P.className = "fw-bold";
date_P.innerHTML = `Registration Date: ${element.registration_date}`;
amount_P.innerHTML = element.final_balance <0 ?`NO DDEPOSITS` :`DEPOSITED`
amount_P.className=element.final_balance <0 ? "fw-bold text-danger" : "fw-bold text-success";
// .toString()


// amount_P.className = "fw-bold";
status_P.innerHTML = element.status;
status_P.className = element.status == "failed" ? "text-danger" : element.status == "pending" ? "text-primary" : "text-success";
div1.append(refrence_P, date_P);
div2.append(amount_P);
figure.append(div1, div2);
  document.querySelector(".history-container").append(figure);
};


// let handle_cancel_investment = async (button, investment) => {
//   try {
//     button.innerHTML = "proccessing...";
//     const response = await fetch(
//       // "http://localhost:5000/api/user/investment/cancel",

//       "https://ndogo-financial-kes-production.up.railway.app/api/user/investment/cancel",
//       {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           token: getCookie("token"),
//           user: getCookie("user"),
//           investment: investment,
//         }),
//       },
//     );
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       alert(result.errMessage);
//       button.innerHTML = "try again";
//       return;
//     }
//     button.innerHTML = "success";
//     window.location.href = "/my-investment.html";
//   } catch (err) {
//     alert(err.message);
//     button.innerHTML = "try again";
//   }
// };

// const set_percentage = () => {
//   setInterval(() => {
//     document.querySelector("#percentage_view").innerHTML =
//       generate_percentage();
//     setColor();
//   }, 1000);
// };

// const createAndAppendElement = (element) => {
//   console.log(element);
// //   const section = document.createElement("section");
// //   section.className = "table-list-credit";

// //   let FNH4 = document.createElement("h4");
// //   let LNH4 = document.createElement("h4");
// //   let FDH4 = document.createElement("h4");
// // //   let RTH4 = document.createElement("h4");
// // //   let EPH4 = document.createElement("h4");
// // //   EPH4.id = "percentage_view";
// //   // let IVP = document.createElement("h4");
// //   // let PT_LS = document.createElement("h4");

// // //   let AN = document.createElement("h4");

// // //   TDH4.innerHTML = element.transaction_date;
// // //   REFH4.innerHTML = element.refrence_number;
// // FNH4.innerHTML = element.first_name;
// // LNH4.innerHTML=element.last_name
// //   FDH4.innerHTML = `$${element.first_deposit
// //     .toString()
// //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0` || "0";
 
 
// //   section.append(FNH4,LNH4,FDH4);
// //   document.querySelector(".history-table").append(section);

//   // set_percentage();
// };

const shape_result = (referrals) => {
  referrals.map((referral) => createAndAppendElement(referral));
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
        "https://ndogo-financial-kes-production.up.railway.app/api/user/referral/fetch",
      // "http://localhost:5000/api/user/referral/fetch",

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
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
