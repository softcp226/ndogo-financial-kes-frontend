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




function copyToClipboard() {
  var copyText = wallet_address.innerHTML;
  navigator.clipboard.writeText(copyText).then(() => {
   
    if (copyText.length < 1) return;
    alert("Copied wallet to clipboard");
    copied_to_clipboard = true;
  });
}

const getDepositID = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

function copyToClipboard() {
  var copyText = wallet_address.innerHTML;
  navigator.clipboard.writeText(copyText).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    if (copyText.length < 1) return;
    alert("Copied wallet to clipboard");
    copied_to_clipboard = true;
  });
}
// const display_address = (selectedOption, wallet_container, data) => {
//   switch (selectedOption) {
//     case "qr_code":
//       document.querySelector("#qr_code").style.display = "inline-block";
//       document.querySelector("#wallet_address").style.display = "none";
//       document.querySelector(
//         "#wallet_note",
//       ).innerHTML = `Open your Crypto.com App, scan the qr code above and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} `;
//       //  else {
//       // document.querySelector(
//       //   "#wallet_note",
//       // ).innerHTML = `Open your Crypto.com App, copy and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} to the wallet address above `;
//       // document.querySelector("#qr_code").style.display = "none";
//       // document.querySelector("#wallet_address").style.display =
//       //   "inline-block";
//       // }
//       break;

//     case "wallet_address":
//       // if (wallet_container != "unavailable"){
//       // if (wallet_container != "unavailable") {
//       document.querySelector("#qr_code").style.display = "none";
//       document.querySelector("#wallet_address").style.display = "inline-block";
//       document.querySelector(
//         "#wallet_note",
//       ).innerHTML = `Open your Crypto.com App,copy and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method}  to the wallet above`;
//       // } else {
//       //   //   document.querySelector("#qr_code").style.display = "none";
//       //   //   document.querySelector("#wallet_address").style.display = "inline-block";
//       //   // }
//       // }else{
//       // document.querySelector("#qr_code").style.display = "none";
//       // document.querySelector("#wallet_address").style.display = "inline-block";
//       // document.querySelector("#wallet_note").innerHTML = `Send ${
//       //   data.currency
//       // }${data.deposit_amount} to the ${data.payment_method} ${
//       //   data.payment_method != "Perfect Money" ? "E-mail" : "ID"
//       // } above `;

//       break;

//     default:
//       document.querySelector("#qr_code").style.display = "none";
//       document.querySelector("#wallet_address").style.display = "inline-block";

//       break;
//   }
// };





const set_payment_details = (data) => {
    document.querySelector("#deposit_amount").innerHTML = `AMOUNT: KSH${data.deposit_amount.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      document.querySelector("#payment_writeup").innerHTML = `Send KSH${data.deposit_amount.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} to the payment details below and click confirm payment to submit payment screenshot:`;
  
    }



const shape_result = (data) => {
  const wallet_address_div = document.createElement("div");
  // const qr_code_img = document.createElement("img");
  const wallet_icon = document.createElement("img");
  wallet_address_div.id = "wallet_address";
  wallet_icon.id = "qr_code";
  wallet_icon.src = data.payment_method_icon;
  wallet_address_div.className = "wallet_address";
  const text_h3 = document.createElement("h3");
  text_h3.id = "wallet_note";
 

  wallet_address_div.innerHTML = data.payment_wallet;

   const copyBtn = document.createElement("a");
  copyBtn.className = "btn btn-tetiary m-2";

  copyBtn.innerHTML = "Copy Wallet";
  copyBtn.id="copy-to-clipboard"
copyBtn.onclick = () => copyToClipboard();
  // qr_code_img.src = data.payment_qr_code;
  const nextbtn = document.createElement("a");
  nextbtn.className = "btn btn-dark";
  nextbtn.innerHTML = "I have made payment";
  nextbtn.href = `/submit-receipt.html?${getDepositID()}`;




 
  text_h3.innerHTML = `copy wallet and send ${data.currency}${data.deposit_amount} worth of ${data.payment_method} to the wallet address above `;
  // select.onchange = () =>
  //   display_address(select.value, data.payment_qr_code, data);

  // select.append(wallet_address_option, qr_code_option);
  // console.log(select.value);
  // // if (data.payment_qr_code != "unavailable") {
  // qr_code_img.style.display = "inline-block";
  // wallet_address_div.style.display = "none";

  //     text_h3.innerHTML = `Send ${data.currency}${
  //         data.deposit_amount
  //       } to the ${data.payment_method} ${
  //         data.payment_method != "Perfect Money" ? "E-mail" : "ID"
  //       } `;
  // } else {
  // qr_code_img.style.display = "none";
  // wallet_address_div.style.display = "inline-block";
  // }

  document.querySelector(".wallet-container").append(
    wallet_icon,
    wallet_address_div,
    copyBtn,
    // qr_code_img,
    text_h3,
    // select,
    nextbtn,
    document.createElement("br"),
  );
};

document.querySelector("#confirm_payment").onclick=()=>{
document.querySelector("#confirm_payment").innerHTML="proccessing..."
window.location.href=`payment-screenshot.html?${getDepositID()}`
}

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  document.querySelector("#confirm_payment").disabled=true
  try {
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/create_deposit/fetch",
      // "http://localhost:5000/api/user/create_deposit/fetch",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          user,
          deposit_request_id: getDepositID(),
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);
    set_payment_details(result.message);
      document.querySelector("#confirm_payment").disabled=false
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
