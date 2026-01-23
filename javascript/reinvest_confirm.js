

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
//   window.location.replace("/signin.html");
};

const getAmount = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};




(async() => {
   

    let token = getCookie("token");
  let user = getCookie("user");
  if(!getAmount()) return window.location.replace("/deposit.html");
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
    // if (result.error)return window.location.replace("/signin.html");
    
    if(result.message.reached_trial_limit) {
         document.querySelector("#trial_plan").disabled = true;
       document.querySelector("#trial_plan").innerHTML = "Trial Plan Unavailable";
    //   if(getAmount() <= 4999) return window.location.replace("/deposit.html");
         if(getAmount() <= 4999) {
            document.querySelector("#error_message").innerHTML = "You have reached the trial limit. Please increase your requested amount to meet the next plan’s minimum requirement. you can deposit more money if you don't have enough funds.";
            return document.querySelector('#popup1').style.visibility = 'visible';
      
        }

    //    document.querySelector("#trial_plan").disabled = true;
    //    document.querySelector("#trial_plan").innerHTML = "Trial Plan Unavailable";

    }
 return;
        //   window.location.href = `create-investment.html`;

  } catch (err) {
    console.error(err);
    alert("An error occurred while fetching user data. Please Recheck your network and try again later.");
    // document.querySelector('.errMessage').innerHTML = "An error occurred while submitting your request. Please try again later.";
    // if (result.error) return window.location.replace("/signin.html");
  }

})()



const submit_payment_plan= async (data) => {
  let token = getCookie("token");
  let user = getCookie("user");
  document.querySelector(`#${data.button_id}`).innerHTML="Proccessing..."
  try {
    const response = await fetch(
      "https://ndogo-financial-backend-production.up.railway.app/api/user/create_investment",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user,investment_amount:data.amount,plan_name:data.plan_name }),
      },
    );
    const result = await response.json();

    console.log(result);
    if (result.error) {
        document.querySelector(`#${data.button_id}`).innerHTML="Try Again"
      alert(`An error occured while proccessing your request: ${result.errMessage}`);
      return
    }
    window.location.href = `/action/success.html`;
    console.log(result.message);
  } catch (err) {
      document.querySelector(`#${data.button_id}`).innerHTML="Try again"

    // if (result.error) return alert(`An error occured while proccessing your request${err.errMessage}`)
  }
}

const Trial_Vault_Func=()=>{
    const investment_amount=getAmount()
    const min_investment_amount=100

    if(investment_amount <min_investment_amount){
        document.querySelector('#popup1').style.visibility = 'visible';
        return;
    }

submit_payment_plan({
    amount: investment_amount,
    plan_name: "Trial Plan",
    button_id:"trial_plan"

  });

}

const Biashara_Vault_Func=()=>{
    const investment_amount=getAmount()
    const min_investment_amount=5000

     if(investment_amount <min_investment_amount){
        document.querySelector('#popup1').style.visibility = 'visible';
        return;
    }
    submit_payment_plan({
    amount: investment_amount,
    plan_name: "Biashara Vault",
    button_id:"Biashara_Vault"
  });


}
const Imara_Vault_Func=()=>{
    const investment_amount=getAmount()
    const min_investment_amount=20000
    if(investment_amount <min_investment_amount){
        document.querySelector('#popup1').style.visibility = 'visible';
        return;
    }

    submit_payment_plan({
    amount: investment_amount,    
    plan_name: "Imara Vault",
    button_id:"Imara_Vault"
  });
}

const Uwezo_Vault_func=()=>{
    const investment_amount=getAmount()
    const min_investment_amount=50000
      if(investment_amount <min_investment_amount){
        document.querySelector('#popup1').style.visibility = 'visible';
        return;
    }
    submit_payment_plan({
    amount: investment_amount,    
    plan_name: "Uwezo Vault",
    button_id:"Uwezo_Vault"
  });
}

const Legacy_Vault_func=()=>{
    const investment_amount=getAmount()
    const min_investment_amount=100000
      if(investment_amount <min_investment_amount){
        document.querySelector('#popup1').style.visibility = 'visible';
        return;
    }

    submit_payment_plan({
    amount: investment_amount,
    plan_name: "Legacy Vault",
    button_id:"Legacy_Vault"
  });
}

document.querySelector('#close_modal').addEventListener('click', () => {
  document.querySelector('#popup1').style.visibility = 'hidden';    
});

const selectCycle = (investment_plan) => {
switch (investment_plan) {
    case "Trial Plan":
        Trial_Vault_Func()
        break;

        case "Biashara Vault":
        Biashara_Vault_Func()
        break;

        case "Imara Vault":
       Imara_Vault_Func()
        break;

        case "Uwezo Vault":
        Uwezo_Vault_func()
        break;

         case "Legacy Vault":
        Legacy_Vault_func()
        break;

    default:
        break;
}
}