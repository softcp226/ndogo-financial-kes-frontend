const setuserProfile = async (userInformation) => {
    // alert("hey");
    try {
      document.querySelector("#savephoto").innerHTML = "Proccessing...";
  
      const response = await fetch(
        // "http://localhost:5000/api/user/updateprofileInfo/setprofile",
        "https://ndogo-financial-backend-production.up.railway.app/api/user/updateprofileInfo/setprofile",
         {
        method: "POST",
        //   headers: { "content-type": "application/json" },
        body: userInformation,
      });
      const result = await response.json();
      console.log(result);
      if (result.error) {
        // document.querySelector(".errMessage").innerHTML = result.errMessage;
        document.querySelector("#savephoto").innerHTML = "Try again";
        return;
      }
      document.querySelector("#savephoto").innerHTML = "Success";
      window.location.reload();
    } catch (error) {
      // document.querySelector(".errMessage").innerHTML = error.message;
      document.querySelector("#savephoto").innerHTML = "Try again";
    }
  };
  
  document.querySelector("#savephoto").onclick = () => {
    event.preventDefault();
    const photo_txt = document.querySelector("#photo_txt");
    const photo = document.querySelector("#photo");
  
    if (!photo.value) return (photo_txt.style.color = "red");
    const user = getCookie("user");
    const token = getCookie("token");
  
    const formdata = new FormData();
    formdata.append("passport", photo.files[0]);
    formdata.append("token", token);
    formdata.append("user", user);
    setuserProfile(formdata);
  };
  