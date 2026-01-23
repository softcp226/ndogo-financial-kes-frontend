const show_err = (txt) => (txt.style.border = "2px solid red");
// const full_name_txt = document.querySelector("#full_name_txt");
// const last_name_txt=document.querySelector("#last_name_txt")
// const email_txt = document.querySelector("#email_txt");
// const phone_number_txt = document.querySelector("#phone_number_txt");


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

const update_user = async (userInformation) => {
  
  try {
    document.querySelector("#save_profile").innerHTML = "Proccessing...";

    const response = await fetch(
      // "http://localhost:5000/api/user/updateprofileInfo", 
    "https://ndogo-financial-backend-production.up.railway.app/api/user/updateprofileInfo",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInformation),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#profile_err").innerHTML = result.errMessage;
      document.querySelector("#save_profile").innerHTML = "Try again";
      return;
    }
    document.querySelector("#save_profile").innerHTML = "Success";
    window.location.reload();
  } catch (error) {
    document.querySelector("#profile_err").innerHTML = error.message;
    document.querySelector("#save_profile").innerHTML = "Try again";
  }
};

document.querySelector("#save_profile").onclick = () => {
  event.preventDefault();
  const full_name = document.querySelector("#full_name");
  const email= document.querySelector("#email");
  const phone_number = document.querySelector("#phone_number");
  const country = document.querySelector("#country");

  if (!email.value) return show_err(email);
  if (!full_name.value) return show_err(full_name);
  if (!phone_number.value) return show_err(phone_number);
  if (!country.value) return show_err(country);

  update_user({
    user: getCookie("user"),
    token: getCookie("token"),
    full_name:full_name.value,
    // last_name: last_name.value,
    email: email.value,
    phone_number: phone_number.value,
    country: country.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
     full_name.style.border = "1px solid #263238";
    // last_name_txt.style.color = "#263238";
    email.style.border = "1px solid #263238";
    phone_number.style.border = "1px solid #263238";
    country.style.border = "1px solid #263238";
  };
});

const handle_user_result = (result) => {
  console.log(result);
  // document.querySelector("#my_profile").src =
  //   result.user_icon || "assets/images/photo.png";
  // document.querySelector("#full_name").innerHTML = result.full_name;
  // document.querySelector("#my_email").innerHTML = result.email;

  document.querySelector("#full_name").value = result.full_name;

  document.querySelector("#email").value = result.email;
  document.querySelector("#phone_number").value = result.phone_number;
  document.querySelector("#country").value = result.country;

};

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      //   "/api/users/myaccount",
      // "http://localhost:5000/api/user/find",
      "https://ndogo-financial-backend-production.up.railway.app/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    // user_result = result.message;
    console.log(result);
    if (result.error) {
      //   document.querySelector(".email_message").innerHTML = "";
      //   errMessage_container.innerHTML = result.errMessage;
      //   errMessage_container.style.display = "block";

      // const container_fluid = document.querySelector(".container-fluid");
      // container_fluid.style.color = "red";
      // container_fluid.style.margin = "2px";
      // container_fluid.style.textAlign = "center";
      // container_fluid.innerHTML = result.errMessage;
    } else {
      //   document.querySelector("#email").href = `mailto:${result.message.email}`;
      //   document.querySelector("#email").innerHTML = `${result.message.email}`;
      //   // alert(result.message.account_is_verified);
      //   if (result.message.account_is_verified == true) {
      //     const d = new Date();
      //     d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
      //     let expires = "expires=" + d.toUTCString();
      //     document.cookie = `account_isverified=${true} ; ${expires}`;
      //     window.location.replace("dashboard.html");
      //   }

      handle_user_result(result.message);
    }
  } catch (error) {
    // const container_fluid = document.querySelector(".container-fluid");
    // container_fluid.style.color = "red";
    // container_fluid.style.margin = "2px";
    // container_fluid.style.textAlign = "center";
    // container_fluid.innerHTML = error.message;
  }
})();

