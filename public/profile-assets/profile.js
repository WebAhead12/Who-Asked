const leftBtn = document.querySelector("#leftbtn")
const rightBtn = document.querySelector("#rightbtn")
const profileImg = document.querySelector(".imageIcon")
const searchBox = document.querySelector("#searchBox");
const home = document.querySelector(".home");
const logout = document.querySelector(".logout");
const profileName = document.querySelector(".profileName");
const questionBox = document.querySelector("#questionBox");
const pages = document.querySelector(".pages");
const questionsContainer = document.querySelector(".questions");



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

//change profile icon when the left arrow clicks
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

//change profile icon when the right arrow clicks
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
    if (!response.ok) throw new Error(response.status);
    return response.json();
  })
  .then(result => {
    if (!result.id) {
      profileImg.src = `/icons/0.png`
    } else {
      profileImg.src = `/icons/${result.id}.png`
    }
  })
  .catch(err => {
    searchBox.value = "Error, can't retrieve image";
    searchBox.style.color = "#fc6161";
  });

//get total questions asked to decided the pages numbers
fetch(`/totalquestions/${username}`)
  .then((response) => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  })
  .then(result => {
    let pageNumber = Math.ceil(result.total / 10)// total question divided by 10 and Math.ceil map the result to least integer greater than or equal to the result.
    pages.innerHTML = distributeNumberOfPages(pageNumber).innerHTML;
  })
  .catch(err => {
    questionBox.value = "Error, can't retrieve the image";
    questionBox.style.color = "#fc6161";
  });

getDataForSpecificPage(1);//load page for first time with first 10 question if exists.

//get the data from the post table in database and put it on the page accordingly.
pages.addEventListener('click', event => {
  const allUserPages = event.target.parentNode.childNodes; //as a nodeList
  for (let page of allUserPages) {
    page.className = 'page';
  }
  event.target.classList.add('activePage');
  getDataForSpecificPage(event.target.innerText);
})

//set question
questionBox.addEventListener('keyup', event => {
  if (event.keyCode == 13) {
    fetch(`data/${username}`, {
      method: "POST",
      body: JSON.stringify({ isAnswer: false, question: event.target.value, questionId: '', answer: '' }),
      headers: { "content-type": "application/json" }
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText).message;
        return response.json();
      })
      .then((res) => {
        if (res.response != "Successful") return Promise.reject(res.response);
        console.log('reached?');
        //update page
        const pageNumber = pages.lastChild.innerText
        pages.lastChild.click();
        getDataForSpecificPage(pageNumber);
        event.target.value = '';

      })
      .catch(err => {
        questionBox.value = "Sorry you can't set a question.";
        questionBox.style.color = "#fc6161";
      });

  }
})

//set answer
questionsContainer.addEventListener('click', event => {
  const id = event.target.id
  if (id) {
    event.target.addEventListener('keyup', e => {
      if (e.keyCode == 13) {
        fetch(`data/${username}`, {
          method: "POST",
          body: JSON.stringify({ isAnswer: true, question: '', questionId: id, answer: e.target.value }),
          headers: { "content-type": "application/json" }
        })
          .then((response) => {
            if (!response.ok) throw new Error(response.statusText).message;
            return response.json();
          })
          .then((res) => {
            if (res.response != "Successful") return Promise.reject(res.response);
            //update page
            const pageNumber = whatPage(pages);
            getDataForSpecificPage(pageNumber);
          })
          .catch(err => {
            questionBox.value = "You can't set an answer, please login..";
            questionBox.style.color = "#fc6161";
          });
      }
    })
  }

})

searchBox.addEventListener('keyup', event => {
  if (event.keyCode == 13) {
    const user = event.target.value;
    fetch(`/view/${user}`)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then(result => {
        if (result.response == "Successful")
          window.location.href = `/profile/${user}`;
        else if (result.response == "NotFound")
          searchBox.value = `${user} doesn't exist`;
        else
          window.location.href = '/';
      })
      .catch(err => {
        searchBox.value = "Error occured, Unable to Search";
        searchBox.style.color = "#fc6161";
      });
  }
})

//dynamically create pages number according to number of questions.
function distributeNumberOfPages(pagesNumber) {
  let currentPages = document.createElement('div');
  for (let i = 1; i <= pagesNumber; i++) {
    let div = document.createElement('div');
    div.classList.add('page');
    div.innerText = i;
    if (i == 1)
      div.classList.add('activePage');
    currentPages.appendChild(div);
  }
  return currentPages;
}

//dyncamiclly create the questions container for every page
function createQuestionsPages(questionsData) {//questionsData = {data: [array of 10 question objects at most]}
  const container = document.createElement('container');
  for (let i = 0; i < questionsData.data.length; i++) {

    const h3 = document.createElement('h3');
    h3.innerText = questionsData.data[i].question;
    container.appendChild(h3);

    if (questionsData.data[i].answer) {//answer is not empty(there is answer)
      const p = document.createElement('p');
      p.innerText = questionsData.data[i].answer;
      container.appendChild(p);
    } else {
      const input = document.createElement('input');
      const br = document.createElement('br');
      input.type = 'text';
      input.classList.add('answer-box');
      input.placeholder = 'Answer here';
      input.id = questionsData.data[i].id;
      container.appendChild(input);
      container.appendChild(br);
    }
    if (i != questionsData.data.length - 1) {
      const hr = document.createElement('hr');
      container.appendChild(hr);
    }
  }
  return container;
}

//get data from database according to the page number.
function getDataForSpecificPage(page) {
  fetch(`/data/${username}/${page}`)
    .then(response => {
      if (!response.ok) throw new Error(response.statusText).message;
      return response.json();
    })
    .then(result => {
      questionsContainer.innerHTML = createQuestionsPages(result).innerHTML;
    })
    .catch(err => {
      questionBox.value = "Error, can't retrieve the questions";
      questionBox.style.color = "#fc6161";
    });
}

//find the selected page and return it number
function whatPage(pagesParent) {
  for (let page of pagesParent.childNodes) {
    if (page.classList.contains('activePage'))
      return page.innerText;
  }
}