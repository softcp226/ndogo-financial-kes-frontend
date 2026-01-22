const setText2 = (user) => {
  let referral = document.querySelector("#referral_link");
  referral.value = user.referral_link;

};


document.querySelector("#copy_referral_link").onclick = () => {
  let referral = document.querySelector("#referral_link");      
    referral.select();  
    referral.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(referral.value);      
    // alert("Referral link copied: " + referral.value);
    document.querySelector("#copy_referral_link").innerHTML = "Copied!";
    setTimeout(() => {
      document.querySelector("#copy_referral_link").innerHTML = "Copy Referral Link";
    }, 2000);


};
// .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// const getCookie = (cname) => {
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

(async () => {
  const user = getCookie("user");
  const token = getCookie("token");
  try {
    const response = await fetch(
      "https://crescentpips-backend.glitch.me/api/user/find",
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
      setText2(result.message);
    }
  } catch (error) {
    alert(error.message);
  }
})();
