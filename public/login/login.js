let errorBlock = document.querySelector(".responseBox p");
let usernameBlock = document.querySelector("#username");
let passwordBlock = document.querySelector("#password");
let passwordConfirmBlock = document.querySelector("#passwordConfirm");
let passwordConfirmContainer = Array.from(document.querySelectorAll(".passwordConfirm"));
let responseContainer = document.querySelector(".responseBox");
let loginButton = document.querySelector(".loginButton");
let registerButton = document.querySelector(".registerButton");

let registerActive = false;
let currentErrorTypingAnimation;

const TYPING_ANIMATION_SPEED = 35;

const accountErrors = {
  USERNAME_MISSING: "Please enter a username",
  PASSWORD_MISSING: "Please enter a password",
  PASSWORD_CONFIRMATION_MISSING: "Please enter password confirmation",
  WRONG_CONFIRMATION_PASSWORD_ERROR: "Password confirmation does not match",

  USERNAME_NOT_FOUND_ERROR: "Username not found",
  USERNAME_TAKEN_ERROR: "Username already taken",
  WRONG_PASSWORD_ERROR: "Password is incorrect",
  DEFAULT: "An error has occured, please try again",
};

const REGISTER_URL = "/register";
const LOGIN_URL = "/login";

//Displays error messages with a typing animation.
function displayError(error) {
  let i = 0;
  errorBlock.innerHTML = "";
  if (currentErrorTypingAnimation) clearTimeout(currentErrorTypingAnimation);
  function typingAnimation() {
    if (i >= error.length) return;
    errorBlock.innerHTML += error.charAt(i);
    i++;
    currentErrorTypingAnimation = setTimeout(typingAnimation, TYPING_ANIMATION_SPEED);
  }
  currentErrorTypingAnimation = setTimeout(typingAnimation, 0);
  setTimeout(() => {
    if (errorBlock.textContent == error) errorBlock.textContent = "";
  }, 2500 + TYPING_ANIMATION_SPEED * error.length);
}

//Routes the errors into predetermined error messages to be displayed, otherwise show normal.
function errorRouter(error) {
  console.log(error);
  switch (error.toLowerCase()) {
    case "usernametaken":
      error = accountErrors.USERNAME_TAKEN_ERROR;
      break;
    case "notfound":
      error = accountErrors.USERNAME_NOT_FOUND_ERROR;
      break;
    case "wrongpassword":
      error = accountErrors.WRONG_PASSWORD_ERROR;
      break;
    default:
      error = accountErrors[error] || accountErrors.DEFAULT;
      break;
  }
  displayError(error);
  return error;
}

//Posts fetch to the server to login into a user, and dispalys any errors the appear.
function fetchLoginAccount(username, password) {
  return fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText).message;
      return response.json();
    })
    .then((res) => {
      if (res.response != "Successful") return Promise.reject(errorRouter(res.response));
      window.location.href = `/profile/${username}`;
    })
    .catch(errorRouter);
}

//Posts fetch to server to create a user, and displays any errors that appear.
function fetchRegisterAccount(username, password) {
  return fetch(REGISTER_URL, {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText).message;
      return response.json();
    })
    .then((res) => {
      if (res.response != "Successful") return Promise.reject(errorRouter(res.response));
      fetchLoginAccount(username, password, password);
    })
    .catch(errorRouter);
}

//Username textbox clear on focus.
usernameBlock.addEventListener("focusin", (event) => {
  event.target.value = "";
});

//Username textbox enter key triggers login/register.
usernameBlock.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (registerActive) registerButton.click();
    else loginButton.click();
    event.target.blur();
  }
});

//Password textbox clear on focus.
passwordBlock.addEventListener("focusin", (event) => {
  event.target.value = "";
});

//Password textbox enter key triggers login/register.
passwordBlock.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (registerActive) registerButton.click();
    else loginButton.click();
    event.target.blur();
  }
});

//Password confirm textbox clear on focus.
passwordConfirmBlock.addEventListener("focusin", (event) => {
  event.target.value = "";
});

//password textbox enter key triggers login/register.
passwordConfirmBlock.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    registerButton.click();
    event.target.blur();
  }
});

//Switches between login and register buttons if need to leave out of register mode, otherwise does a login fetch.
loginButton.addEventListener("click", (event) => {
  if (registerActive) {
    registerActive = false;

    loginButton.style["transition-duration"] = "0.15s";
    registerButton.style["transition-duration"] = "0.15s";

    registerButton.style.opacity = "0";
    loginButton.style.opacity = "0";
    setTimeout(() => {
      loginButton.parentNode.insertBefore(loginButton, loginButton.previousElementSibling);
    }, 150);

    setTimeout(() => {
      loginButton.style.opacity = "1";
      registerButton.style.opacity = "1";
      loginButton.style["transition-duration"] = "0.25s";
      registerButton.style["transition-duration"] = "0.25s";
    }, 400);
    passwordConfirmContainer.forEach((elem) => {
      setTimeout(() => {
        elem.style.display = "none";
      }, 300);
      elem.style.opacity = "0";
    });
    return;
  }
  usernameBlock.style["border-color"] = "black";
  passwordBlock.style["border-color"] = "black";

  if (usernameBlock.value == "") {
    usernameBlock.style["border-color"] = "var(--font-color)";
    return errorRouter("USERNAME_MISSING");
  }
  if (passwordBlock.value == "") {
    passwordBlock.style["border-color"] = "var(--font-color)";
    return errorRouter("PASSWORD_MISSING");
  }

  fetchLoginAccount(usernameBlock.value, passwordBlock.value).catch((err) => {
    switch (err) {
      case accountErrors.USERNAME_NOT_FOUND_ERROR:
        usernameBlock.style["border-color"] = "var(--font-color)";
        break;
      case accountErrors.WRONG_PASSWORD_ERROR:
        passwordBlock.style["border-color"] = "var(--font-color)";
    }
  });
});

//Switches between login and register buttons if need to join register mode, otherwise does a register fetch.
registerButton.addEventListener("click", (event) => {
  if (!registerActive) {
    registerActive = true;

    loginButton.style["transition-duration"] = "0.15s";
    registerButton.style["transition-duration"] = "0.15s";

    registerButton.style.opacity = "0";
    loginButton.style.opacity = "0";
    setTimeout(() => {
      registerButton.parentNode.insertBefore(registerButton, registerButton.previousElementSibling);
    }, 150);

    setTimeout(() => {
      loginButton.style.opacity = "1";
      registerButton.style.opacity = "1";
      loginButton.style["transition-duration"] = "0.25s";
      registerButton.style["transition-duration"] = "0.25s";
    }, 300);
    passwordConfirmContainer.forEach((elem) => {
      setTimeout(() => {
        elem.style.display = "block";
      }, 300);
      elem.style.opacity = "1";
    });
    passwordConfirmBlock.value = "";
    return;
  }
  usernameBlock.style["border-color"] = "black";
  passwordBlock.style["border-color"] = "black";
  passwordConfirmBlock.style["border-color"] = "black";

  if (usernameBlock.value === "") {
    usernameBlock.style["border-color"] = "var(--font-color)";
    return errorRouter("USERNAME_MISSING");
  }
  if (passwordBlock.value === "") {
    passwordBlock.style["border-color"] = "var(--font-color)";
    return errorRouter("PASSWORD_MISSING");
  }
  if (passwordConfirmBlock.value === "") {
    passwordConfirmBlock.style["border-color"] = "var(--font-color)";
    return errorRouter("PASSWORD_CONFIRMATION_MISSING");
  }
  if (passwordBlock.value !== passwordConfirmBlock.value) {
    passwordConfirmBlock.style["border-color"] = "var(--font-color)";
    return errorRouter("WRONG_CONFIRMATION_PASSWORD_ERROR");
  }
  fetchRegisterAccount(usernameBlock.value, passwordBlock.value).catch((err) => {
    if (err === accountErrors.USERNAME_TAKEN_ERROR) {
      usernameBlock.style["border-color"] = "var(--font-color)";
    }
  });
});
