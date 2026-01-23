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

const validate_user_limit = async(amount) => {
  // Assuming the limit is 10000 for this example   
let token = getCookie("token");
  let user = getCookie("user");
document.querySelector('#deposit').innerHTML = "Processing...";
  document.querySelector('#deposit').disabled = true;
  try {
    const response = await fetch(
      "https://ndogo-financial-backend-production.up.railway.app/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)return window.location.replace("/signin.html");
    
    if(result.message.reached_trial_limit) {
      if(amount <= 4999) {
        document.querySelector('.errMessage').innerHTML = "You have reached your deposit limit for the trial period. Please upgrade your account to deposit more.";
        document.querySelector('#amount').style.border = '2px solid red';
        document.querySelector('#deposit').innerHTML = "Try Again";
        document.querySelector('#deposit').disabled = false;
        return;
      }else{
         return window.location.href = `create-investment.html?${amount}`;

      }

    }
 
          window.location.href = `create-investment.html?${amount}`;

  } catch (err) {
    console.error(err);
    document.querySelector('.errMessage').innerHTML = "An error occurred while submitting your request. Please try again later.";
    // if (result.error) return window.location.replace("/signin.html");
  }
}


document.querySelector('#deposit').addEventListener('click', function() {
    event.preventDefault();
  const depositAmount = document.querySelector('#amount').value;
  if (!depositAmount || isNaN(depositAmount) || depositAmount <= 0) {
    // alert('Please enter a valid deposit amount.');      
document.querySelector('#amount').style.border = '2px solid red';
    return;     
    }


validate_user_limit(depositAmount)  


  // Assuming you have a function to handle the deposit logic   
  // window.location.href = `create-investment.html?${depositAmount}`;
//   const currency = document.querySelector('#currency').value;

//   if (!depositAmount || !currency) {
//     alert('Please enter a valid deposit amount and select a currency.');
//     return;
//   }

//   // Assuming you have a function to handle the deposit logic
//   handleDeposit(depositAmount, currency);
})


document.querySelector('#amount').onkeyup = () =>{
  document.querySelector('.errMessage').innerHTML = "";
  document.querySelector('#amount').style.border = '2px solid #fff';
}


//  document.querySelector("input").forEach((input) => {
//     // document.querySelector(".errMessage").innerHTML = "";
//     // input.onkeyup = () => (input.style.border = "0.1px solid #fff");
//     input.onkeyup = () => {
//       input.style.border = "2px solid #fff";
//     //   input.value = input.value.replace(/\s/g, "");
//     }
//   });