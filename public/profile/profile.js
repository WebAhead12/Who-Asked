const leftBtn = document.querySelector("#leftbtn");
const rightBtn = document.querySelector("#rightbtn");
const profileImg = document.querySelector(".imageIcon");
const profileName = document.querySelector("profileName");
const searchBox = document.querySelector("#searchBox");

const homeButton = document.querySelector("#homeButton");
const logoutButton = document.querySelector("#logoutButton");

leftBtn.addEventListener("click", (event) => {
  let urlArray = window.location.href.replace("#", "").split("/");
  fetch(`/image/${urlArray[urlArray.length - 1]}`, {
    method: "POST",
    body: JSON.stringify({ direction: "left" }),
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText).message;
      return response.json();
    })
    .then((res) => {
      if (res.response != "Successful") return Promise.reject(res.response);
      profileImg.src = `/icons/${res.data}.png`;
    })
    .catch((err) => {
      searchBox.value = "Couldn't change profile image";
      searchBox.style.color = "#fc6161";
    });
});

rightBtn.addEventListener("click", (event) => {
  let urlArray = window.location.href.replace("#", "").split("/");
  fetch(`/image/${urlArray[urlArray.length - 1]}`, {
    method: "POST",
    body: JSON.stringify({ direction: "right" }),
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText).message;
      return response.json();
    })
    .then((res) => {
      if (res.response != "Successful") return Promise.reject(res.response);
      profileImg.src = `/icons/${res.data}.png`;
    })
    .catch((err) => {
      searchBox.value = "Couldn't change profile image";
      searchBox.style.color = "#fc6161";
    });
});

homeButton.addEventListener("click", (event) => {
  window.location.href = "/";
});

logoutButton.addEventListener("click", (event) => {
  window.location.href = "/logout";
});

let urlArray = window.location.href.replace("#", "").split("/");
profileName.textContent = urlArray;
