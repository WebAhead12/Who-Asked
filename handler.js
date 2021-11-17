// const db = require('./databse/connection');
const auth = require('./dataHandlers/auth');
const users = require('./database/users');


//home handler returns index.html file
function home(req, res) {
  if (req.user) {
    res.redirect(`/profile/${req.user}`);
    return;
  }
  res.sendFile('./public/login/login.html');
}

//Register takes username + password, adds user to db, send status message to FrontEnd
//async & await is missing.
function register(req, res) {
  const account = req.body;
  if (auth.checkCredential(account.username, account.password).response == 'NotFound') {//make user only if it didn't exist before.
    // insert user to database
    users.setUser(account.username, account.password);
    return { response: 'Success' };
  }
  return { response: 'UsernameTaken' };
}


//log in process
//async & await is missing.
function login(req, res) {
  const account = req.body;
  if (auth.checkCredential(account.username, account.password).response == 'Successful') {
    //make a cookie for the logged user.
    const token = auth.encodeAccount(account);
    res.cookie("account", token, { maxAge: 600000 });
    res.redirect(`/profile/${account.username}`);
    return { response: 'Successful' };
  }
  else if (auth.checkCredential(account.username, account.password).response == 'NotFound') {
    return { response: 'NotFound' };
  } else {
    return { response: 'WrongPassword' };
  }
}


// takes user params and retrieves questions from db relating to user ID
function getUserQuestions(req, res) {

}


//adds question, user id, time(hopefully), questionId and (is) answer if available
function setQuestionOrAnswer(req, res) {

  // check if question already exists
  // SELECT * FROM questions WHERE question = userQuestion

  // if not add the question
  //  INSERT OF RETURNING id

  // if isAnswer is set to true then update the question's answer
  // UPDATE question WHERE id = questionId SET answer = userAnswer

}


//retrieves current user's profile from db
function getProfile(req, res) {

}


//retrieves user that was searched for in search bar
function getUser(req, res) {

}


//gets user icon that they chose on registration?
function getImageId(req, res) {

}


//adds user icon if they're a registered user
function setImageId(req, res) {

}

module.exports = { home, register, login, getUserQuestions, setQuestionOrAnswer, getProfile, getUser, getImageId, setImageId };
