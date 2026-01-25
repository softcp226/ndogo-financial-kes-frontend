// const selector = (name, value) => {
//   document.querySelector(`#${name}`).innerHTML = value;
// };
let available_balance;

const setUser = (userInfo) => {
//   document.querySelector("#person-image").src = userInfo.passport;
available_balance = userInfo.final_balance;
document.querySelector("#available_balance").innerHTML = `Available Balance: KSH${userInfo.final_balance
    .toString() 
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;


};

 document.querySelector("input").onkeyup = () =>{
    document.querySelector("#amount").style.border = "2px solid #fff";
     document.querySelector(".errMessage").innerHTML = "";
 }
document.querySelector("#next").addEventListener("click", async () => {
    event.preventDefault();
const amount=document.querySelector("#amount");
if(!amount.value || amount.value <= 99) {
    amount.style .border= "2px solid red";
    document.querySelector(".errMessage").innerHTML = "The Minimum Reinvestment Amount is KSH100 and above. Please enter a valid amount.";
    return;     
}

if(amount.value > available_balance) {
    amount.style .border= "2px solid red";  

    document.querySelector(".errMessage").innerHTML = `You cannot reinvest more than your available balance of KSH${available_balance
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}. Please make a direct deposit `;
    return; 
}
alert(`You are about to reinvest KSH${amount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}. Please confirm if you want to proceed.`);
window.location.href = `/reinvest_confirm.html?${amount.value}`;
// alert(`You are about to reinvest KSH${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}. Please confirm if you want to proceed.`);
    // if(!available_balance || available_balance <= 0) {
    //     alert("You have no available balance to reinvest.");
    //     return;
    // }
//        const reinvestment_source= document.querySelector("#reinvestment_source")
// if(reinvestment_source.value == "ReInvest_from_available_Balance") {
//         // Reinvest from available balance
//        if(available_balance <= 0) {
//             alert("You have no available balance to reinvest.");
//             return;
//         }
//         window.location.href =""
//     } else{
//         // Redirect to direct deposit page  
//         window.location.href = "/deposit.html";         
//     }
})

let getCookie = (cname) => {
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

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://ndogo-financial-kes-production.up.railway.app/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) return window.location.replace("/signin.html");
    setUser(result.message);
  } catch (err) {
    console.log(err);
        alert("An error occurred while fetching user data. Please refresh this page.");
    // if (result.error) return window.location.replace("/signin.html");
  }
})();

// fetch_user({ token }); 
