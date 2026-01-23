





// function setCookie(user, token) {
//   // alert("called")
//   console.log(user);
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   // document.cookie=`email=${email} ; ${expires}`
//   document.cookie = `user=${user} ; ${expires}`;
//   document.cookie = `token=${token} ; ${expires}`;
//   // let navigate;
//   // const params = new URLSearchParams(window.location.search);
//   // for (const param of params) {
//   //   navigate = param[0];
//   // }
//   // if (navigate) return window.location.replace(navigate);
//   // window.location.replace("/dashboard.html");
// }




function setCookie(data) {
  // alert("called")
  // console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${data.user} ; ${expires}`;
  document.cookie = `token=${data.token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search)
  // for (const param of params) {
  //     navigate=param[0]
  // }
  // if(navigate)return window.location.replace(navigate)
 window.location.replace("/dashboard.html");
}

// const loginUser = async (email, password) => {
//   try {
//     document.querySelector("#login").innerHTML = "proccessing...";
//     const response = await fetch(
//       "https://ndogo-financial-backend-production.up.railway.app/api/user/login",
//       // "http://localhost:5000/api/user/login",

//       {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       },
//     );
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       document.querySelector(".errMessage").innerHTML = result.errMessage;
//       document.querySelector("#login").innerHTML = "try again";
//       return;
//     }
//     document.querySelector("#login").innerHTML = "success";
//     setCookie(result.message.user, result.token);
//     // result.message.user_last_login =='real_account' ?window.location.replace("/dashboard.html"):window.location.replace("/demo")
//     // let demo=getCookie("demo")
//     // demo == 'true' ? window.location.replace("/demo"): window.location.replace("/dashboard.html")
// console.log(result)
// if ( result.message.user_last_login =='real_account') {
//   result.message.account_type =="KES" ? window.location.replace("/ke/dashboard.html"):window.location.replace("/dashboard.html")
// } else {
//   window.location.replace("/demo")
// }

//   } catch (err) {
//     document.querySelector(".errMessage").innerHTML = err.message;
//     document.querySelector("#login").innerHTML = "try again";
//   }
// };

const getReferral = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const registerUser = async (data) => {
  try {
    document.querySelector("#submit").innerHTML = "proccessing...";
    const response = await fetch(
      "https://ndogo-financial-backend-production.up.railway.app/api/newuser/register",
      // "http://localhost:5000/api/newuser/register",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "success";
    return setCookie({user:result.message.user,token:result.token});
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "try again";
  }
};
//response gotten

// loginUser("email@gmail.com","password")

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//           return c.substring(name.length, c.length);
//       }
//   }
//   return "";
// }

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector("#submit").onclick = () => {
    let errorColor = "2px solid red";
    event.preventDefault();
    const full_name = document.querySelector("#full_name");
    const email = document.querySelector("#email");
    const phoneNumber = document.querySelector("#phone_number");
    const country = document.querySelector("#country");
   const password = document.querySelector("#password");
   const confirmPassword = document.querySelector("#confirm_password");

   if (!full_name.value)
      return (full_name.style.border = errorColor);
    if (!email.value) return (email.style.border = errorColor);
    if (!phoneNumber.value) return (phoneNumber.style.border = errorColor);
    if (!country.value) return (country.style.border = errorColor);
    if (!password.value) return (password.style.border = errorColor);
    if(password.value.length < 8) {
       document.querySelector(".errMessage").innerHTML = "Password lenght must not be less than 8";
    password.style.border = errorColor
    return
    } 
    if (!confirmPassword.value) return (confirmPassword.style.border = errorColor);
    if(password.value !=confirmPassword.value){
       document.querySelector(".errMessage").innerHTML = "Password must match";
    confirmPassword.style.border = errorColor
    return
    } 

//     document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//   document.cookie = "is_active=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
    registerUser({
        full_name:full_name.value,
        email:email.value,
        phone_number: phoneNumber.value,
        country:country.value,
        password:password.value,
        referral:getReferral() || "",
    });
  };

  document.querySelectorAll("input").forEach((input) => {
    
    input.onkeyup = () =>{ input.style.border = "0.1px solid #fff";
     document.querySelector(".errMessage").innerHTML = "";  
    }
  });
  document.querySelector("select").onchange = () =>
    (document.querySelector("select").style.border = "0.1px solid #fff");
});

// const signUpButton = document.getElementById("signUp");
// const signInButton = document.getElementById("login");
// const container = document.getElementById("container");

// signUpButton.addEventListener("click", () => {
//   container.classList.add("right-panel-active");
// });

// signInButton.addEventListener("click", () => {
//   container.classList.remove("right-panel-active");
// });



//   document.querySelectorAll("input").forEach((input) => {
//     // document.querySelector(".errMessage").innerHTML = "";
//     // input.onkeyup = () => (input.style.border = "0.1px solid #fff");
//     input.onkeyup = () => document.querySelector(".errMessage").innerHTML = "";
//   });
//   document.querySelector("select").onchange = () =>
//     (document.querySelector("select").style.border = "0.1px solid #fff");


