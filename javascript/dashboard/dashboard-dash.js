const setText = (user) => {

  // check_account_type(user.country)

  // document.querySelectorAll("#user_passport").forEach((passport) => {
  //   passport.src = user.passport;
  // });
  document.querySelector("#final_balance").innerHTML = `KSH${user.final_balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
    document.querySelector("#full_name").innerHTML = user.full_name;
    document.querySelector("#running_cycle").innerHTML = `KSH${user.active_investment
    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  document.querySelector("#accumulated_profit").innerHTML = `KSH${user.accumulated_profit 
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`; 
    
  // document.querySelector("#profit_loss").innerHTML = `$${user.profit_loss
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  // document.querySelector(
  //   "#active_investment"
  // ).innerHTML = `$${user.active_investment
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;

  // document.querySelector("#referral_bonus").innerHTML = `$${user.referral_bonus
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.0`;
  // console.log("user", user);
};

// .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

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

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "/api/user/find",
      // "http://localhost:5000/api/user/find",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
    } else {
      setText(result.message);
    }
  } catch (error) {
    console.log(error)
    alert(error.message);
  }
})();


// alert