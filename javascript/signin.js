// const setCookie = (token_01, user, is_active) => {
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = `token_01=${token_01} ; ${expires}`;
//   document.cookie = `user=${user} ; ${expires}`;
//   document.cookie = `is_active=${is_active} ; ${expires}`;
//   window.location.replace("/login_pin.html");
// };

// const check_user = () => {};

// const fetch_user = async (user_form) => {
//   document.querySelector("#signin").innerHTML = "Proccessing...";
//   document.querySelector(".errMessage").innerHTML = "";

//   // console.log(user_form);
//   try {
//     const response = await fetch(
//       "https://zionintercontinentalb-backend.glitch.me/api/user/login",
//       {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(user_form),
//       },
//     );
//     const result = await response.json();
//     console.log(result);
//     if (result.error) {
//       document.querySelector(".errMessage").innerHTML = result.errMessage;
//       document.querySelector("#signin").innerHTML = "Try again";
//     } else {
//       // const [token_01, user, is_active] = ;
//       setCookie(
//         result.message.token_01,
//         result.message.user,
//         result.message.is_active
//       );
//       document.querySelector("#signin").innerHTML = "Success";
//     }
//   } catch (err) {
//     document.querySelector(".errMessage").innerHTML = err.message;
//     document.querySelector("#signin").innerHTML = "Try again";

//     console.log(err);
//   }
// };

// document.querySelector("#signin").onclick = (event) => {
//   event.preventDefault();
//   let user_name = document.querySelector("#user_name");
//   let password = document.querySelector("#password");

//   if (!user_name.value) return (user_name.style.border = "2px solid red");
//   if (!password.value) return (password.style.border = "2px solid red");
//   fetch_user({ user_name: user_name.value, password: password.value });
// };

// document.querySelector("#user_name").onkeyup = (input) => {
//   document.querySelector("#user_name").style.border = "2px solid #fff";
//   document.querySelector("#user_name").value = document
//     .querySelector("#user_name")
//     .value.replace(/\s/g, "");
// };
// document.querySelector("#password").onkeyup = () => {
//   document.querySelector("#password").style.border = "2px solid #fff";
// };

// document.querySelector("#signUp").onclick = () => {
//   window.location.href = "/register.html";
// };











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
  return "";
  // window.location.href = "/login.html";
};





function setCookie(user, token) {
  // alert("called")
  console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `token=${token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search);
  // for (const param of params) {
  //   navigate = param[0];
  // }
  // if (navigate) return window.location.replace(navigate);
  // window.location.replace("/dashboard.html");
}




function setCookie_01(data) {
  // alert("called")
  // console.log(user);
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  // document.cookie=`email=${email} ; ${expires}`
  document.cookie = `user=${data.user} ; ${expires}`;
  document.cookie = `token_01=${data.token} ; ${expires}`;
  // let navigate;
  // const params = new URLSearchParams(window.location.search)
  // for (const param of params) {
  //     navigate=param[0]
  // }
  // if(navigate)return window.location.replace(navigate)
  if(data.country =="Kenya")return window.location.replace("/ke/complete-registration.html");
  window.location.replace("/complete-registration.html");
}

const loginUser = async (email, password) => {
  try {
    document.querySelector("#signin").innerHTML = "proccessing...";
    const response = await fetch(
      "https://ndogo-financial-kes-production.up.railway.app/api/user/login",
      // "http://localhost:5000/api/user/login",

      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#signin").innerHTML = "try again";
      return;
    }
    document.querySelector("#signin").innerHTML = "success";
    setCookie(result.message.user, result.token);
    window.location.replace("/dashboard.html");
 

  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#signin").innerHTML = "try again";
  }
};

const getReferral = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};



document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#signin").onclick = () => {
    event.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    if (!email.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Email is required");
    if (!password.value)
      return (document.querySelector(".errMessage").innerHTML =
        "Password is required");
    if (password.value.length < 8)
      return (document.querySelector(".errMessage").innerHTML =
        "Password must be greater than 8 characters");

    document.querySelector(".errMessage").innerHTML = "";

    loginUser(email.value, password.value);
  };



  document.querySelectorAll("input").forEach((input) => {
    // document.querySelector(".errMessage").innerHTML = "";
    // input.onkeyup = () => (input.style.border = "0.1px solid #fff");
    input.onkeyup = () => document.querySelector(".errMessage").innerHTML = "";
  });
  document.querySelector("select").onchange = () =>
    (document.querySelector("select").style.border = "0.1px solid #fff");
});
