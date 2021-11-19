const leftBtn = document.querySelector("#leftbtn")
const rightBtn = document.querySelector("#rightbtn")
const profileImg = document.querySelector(".imageIcon")
const searchBox = document.querySelector("#searchBox");
const home = document.querySelector(".home");
const logout = document.querySelector(".logout");
const profileName = document.querySelector(".profileName");
const questionBox = document.querySelector("#questionBox");
const pages = document.querySelector(".pages");



const url = window.location.href.replace("#", "").split("/");
const username = url[url.length - 1];

home.addEventListener("click", (event) => {
  window.location.href = '/';
});

logout.addEventListener("click", (event) => {
  fetch('/logout')
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      return response;
    })
    .then(() => window.location.href = "/")
});

leftBtn.addEventListener("click", (event) => {
  fetch(`/image/${username}`, {
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
      profileImg.src = `/icons/${res.data}.png`
    })
    .catch(err => {
      searchBox.value = "Error, can't retrieve image";
      searchBox.style.color = "#fc6161";
    });
});

rightBtn.addEventListener("click", (event) => {
  fetch(`/image/${username}`, {
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
      searchBox.value = "Error, can't retrieve image";
      searchBox.style.color = "#fc6161";
    });
});

//set the username as his profile name
profileName.textContent = username;

//load the user icon on login
fetch(`/image/${username}`)
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText).message;
    return response.json();
  })
  .then(result => profileImg.src = `/icons/${result.id}.png`)
  .catch(err => {
    searchBox.value = "Error, can't retrieve image";
    searchBox.style.color = "#fc6161";
  });

//get total questions asked to decided the pages numbers
fetch(`/totalquestions/${username}`)
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText).message;
    return response.json();
  })
  .then(result => {
    console.log(result.total);
    console.log(Math.ceil(result.total / 10));
    let pageNumber = Math.ceil(result.total / 10)// total question divided by 10 and Math.ceil map the result to least integer greater than or equal to the result.
    pages.innerHTML = distributeNumberOfPages(pageNumber, username).innerHTML;
  })
  .catch(err => {
    questionBox.value = "Error, can't retrieve image";
    questionBox.style.color = "#fc6161";
  });



//dynamically create pages number with href to specific route.
function distributeNumberOfPages(pagesNumber, username) {
  let currentPages = document.createElement('div');
  for (let i = 1; i <= pagesNumber; i++) {
    let div = document.createElement('div')
    div.classList.add('page')
    div.textContent = i;
    let a = document.createElement('a')
    a.appendChild(div);
    a.href = `data/${username}/${i}`;
    currentPages.appendChild(a);
  }
  return currentPages;
}
