let user_transfer_full_name = null;
// /api/user/transfer/validate


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
  window.location.href = "/login.html";
};

document.querySelector("#validate_email").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  if (!email) {
    document.querySelector(".errMessage").innerHTML = "Please enter an email";
    return;
  }
 try {
   document.querySelector("#validate_email").disabled = true;
  document.querySelector("#validate_email").innerHTML = "Validating...";
  const response = await fetch("https://crescentpips-backend.glitch.me/api/user/transfer/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", },
    body: JSON.stringify({ user:getCookie("user"),token:getCookie("token"), email }),
 
});

  const data = await response.json();
  if (data.error) {
    document.querySelector(".errMessage").innerHTML = data.errMessage;
    document.querySelector("#validate_email").disabled = false;
    document.querySelector("#validate_email").innerHTML = "Try Again";
    return;
  }
  user_transfer_full_name = data.message;
    document.querySelector("#full_name").innerHTML= `Full Name: ${data.message}`;
    document.querySelector("#full_name").style.color = "green";
    document.querySelector("#validate_email").innerHTML = "Validated";
  document.querySelector(".errMessage").innerHTML = "";
}catch (error) {
    document.querySelector(".errMessage").innerHTML = "An error occurred, please try again later.";
    console.error("Error validating email:", error);
document.querySelector("#validate_email").disabled = false;
    document.querySelector("#validate_email").innerHTML = "Try Again";
 }
});




document.querySelector("#transfer_fund").addEventListener("click", async (e) => {
  e.preventDefault();
  const amount = document.querySelector("#amount").value;
  const email = document.querySelector("#email").value;
  if (!amount || !email) {
    document.querySelector(".errMessage2").innerHTML = "Please fill in all fields";
    return;
  }
  if (!user_transfer_full_name) {
    document.querySelector(".errMessage2").innerHTML = "Please validate the email first";
    return;
  }
  document.querySelector("#transfer_fund").innerHTML="Proccessing..."
  try {
    const response = await fetch("https://crescentpips-backend.glitch.me/api/user/transfer/fund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: getCookie("user"),
        token: getCookie("token"),
        email,
       transfer_amount:amount,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.error) {
      document.querySelector(".errMessage").innerHTML = data.errMessage;
      document.querySelector("#transfer_fund").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#transfer_fund").innerHTML="success"
    window.location.replace("/action/success.html");
    // document.querySelector(".errMessage").innerHTML = `Transfer successful to ${user_transfer_full_name}`;
  } catch (error) {
    document.querySelector(".errMessage").innerHTML = "An error occurred, please try again later.";
    console.error("Error during transfer:", error);
  }
})





  document.querySelectorAll("input").forEach((input) => {
    
    input.onkeyup = () =>{ input.style.border = "0.1px solid #fff";
     document.querySelector(".errMessage").innerHTML = "";  
            document.querySelector(".errMessage2").innerHTML = "";
    }
  });


