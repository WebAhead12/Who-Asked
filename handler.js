// const db = require('./databse/connection');
const auth = require('./dataHandlers/auth');
const users = require('./database/users');
const question = require('./dataHandlers/questions');
const { response } = require('express');


//home handler returns index.html file
function home(req, res) {
  if (req.user) {
    res.redirect(`/profile/${req.user}`);
    return;
  }
  res.sendFile('./public/login/login.html');
}

//Register takes username + password, adds user to db, send status message to FrontEnd
function register(req, res) {
  const account = req.body;
  auth.checkCredential(account.username, account.password)
    .then(result => {
      if (result.response == 'NotFound')
        users.setUser(account.username, account.password)
          .then(res.send({ response: 'Success' }))
          .catch(res.send({ response: 'Insertion error, unable to set username.' }))
      res.send({ response: 'UsernameTaken' })
    })
    .catch(res.send);
}


//log in process
function login(req, res) {
  const account = req.body;
  auth.checkCredential(account.username, account.password).then(response => {
    if (response.response == 'Successful') {
      const token = auth.encodeAccount(account);
      res.cookie("account", token, { maxAge: 600000 });
    }
    res.send(response);
  }).catch(res.send);
}


// takes user params and retrieves questions from db relating to user ID
function getUserQuestions(req, res) {
  const user = req.params.user;
  const page = req.params.page;
  question.viewQuestions(page, user)
    .then(res.send)
    .catch(res.send);
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
