const leftBtn = document.querySelector("#leftbtn")
const rightBtn = document.querySelector("#rightbtn")
const profileImg = document.querySelector(".imageIcon")
const searchBox = document.querySelector("#searchBox");

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
      console.log(res);
      if (res.response != "Successful") return Promise.reject(res.response);
      profileImg.src = `/icons/${res.data}.png`
    })
    .catch(err => {
      searchBox.value = "Error, can't retrieve image";
      searchBox.style.color = "#fc6161";
    });
})

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
      profileImg.src = `/icons/${res.data}.png`
    })
    .catch(err => {

    });
})

