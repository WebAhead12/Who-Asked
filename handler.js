// const db = require('./databse/connection');
const auth = require('./dataHandlers/auth');
const users = require('./database/users');
const questionHandler = require('./dataHandlers/questions');
const question = require('./database/questions');
const path = require('path');
const { response } = require('express');


//home handler returns index.html file
function home(req, res) {
  if (req.user) {
    res.redirect(`/profile/${req.user.username}`);
    return;
  }
  res.sendFile(path.join(__dirname, "public/login", "login.html"));
}

//Register takes username + password, adds user to db, send status message to FrontEnd
function register(req, res) {
  const account = req.body;
  auth.checkCredential(account.username, account.password)
    .then(result => {
      if (result.response == 'NotFound') {
        users.setUser(account.username, account.password)
          .then(() => res.send({ response: 'Successful' }))
          .catch(err => res.send({ response: 'Insertion error, unable to set username.' }))
      } else {
        res.send({ response: 'UsernameTaken' })
      }
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
  questionHandler.viewQuestions(page, user)
    .then((questions) => res.send(questions.data))
    .catch(err => res.send({ response: 'Unable to get the user`s questions' }));
}

//adds question, user id, time(hopefully), questionId and (is) answer if available
function setQuestionOrAnswer(req, res) {
  const postInfo = req.body;
  const user = req.params.user;
  const isLogged = req.user;

  //a user cant ask himself.
  if (isLogged == user && !postInfo.isAnswer) {
    return res.send({ response: 'NoAllowed' });
  }

  //only logged in users can answer his own questions
  else if (isLogged == user && postInfo.isAnswer) {
    question.setAnswer(postInfo.questionId, postInfo.answer)
      .then(res.send({ response: 'Successful' }))
      .catch(err => {
        res.send({ response: 'Unsuccessful' })
      });
  }

  //logged out user can't answer
  else if (!isLogged && postInfo.isAnswer) {
    return res.send({ response: 'NoAllowed' });
  }

  else {
    let date = new Date().toLocaleString();
    question.setQuestion(req.params.user, postInfo.question, date)
      .then(res.send({ response: 'Successful' }))
      .catch(err => {
        res.send({ response: 'Unsuccessful' })
      });
  }
}


//retrieves current user's profile from db
function getProfile(req, res) {
  if (req.user) {
    res.sendFile(path.join(__dirname, 'public/profile', 'profile.html'));
    return;
  }
  res.redirect('/');
}
//retrieves user that was searched for in search bar
function getUser(req, res) {
  const user = req.params.user;
  if (req.user) {
    users.getUser(user).then(result => {
      if (!result)
        res.send({ response: 'NotFound' });
      else if (result.username == user)
        res.send({ response: 'Same' });
      else
        res.send({ response: 'Successful' });
    }).catch((err) => {
      return { response: 'Query error in users table' };
    });
  }
  res.redirect('/');
}
//gets user icon that they chose on registration?
function getImageId(req, res) {
  users.getUser(user).then(result => {
    res.send({ id: result.imageId })
  }).catch((err) => {
    return { response: `Query error in users table couldn't get the imageID` };
  });
}

//Post /image/:user {id:""} Return={response:"Successful/Unsuccessful"}
//adds user icon if they're a registered user
function setImageId(req, res) {
  const user = req.params.user;
  const id = req.body.id;
  if (req.user == user) {//only the account owner can change his icon!
    users.setImageId(user, id)
      .then(res.send({ response: 'Successful' }))
      .catch(err => {
        res.send({ response: 'Unsuccessful' });
      })
  }
}

module.exports = { home, register, login, getUserQuestions, setQuestionOrAnswer, getProfile, getUser, getImageId, setImageId };
