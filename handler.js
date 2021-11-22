// const db = require('./databse/connection');
const auth = require('./dataHandlers/auth');
const users = require('./dataHandlers/users');
const questionHandler = require('./dataHandlers/questions');
const path = require('path');
const { response } = require('express');


//home handler returns index.html file
function home(req, res) {
  if (req.user) {
    res.redirect(`/profile/${req.user}`);
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
    .catch(err => res.send({ response: 'Error occured while checking credentials' }));
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
  }).catch(err => {
    console.log(err)
    res.send({ response: 'Error occured while checking credentials' });
  });
}


// takes user params and retrieves questions from db relating to user ID
function getUserQuestions(req, res) {
  const user = req.params.user;
  const page = req.params.page;
  questionHandler.viewQuestions(page, user)
    .then((questions) => res.send(questions))
    .catch(err => res.send({ response: 'Unable to get the user`s questions' }));
}

//get how much the user has been asked
function getQuestionsQuantity(req, res) {
  const user = req.params.user;
  questionHandler.getQuestions(user)
    .then(result => {
      res.send({ total: result.data.length })
    })
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
  //logged in user can answer another users' questions
  else if (isLogged != user && postInfo.isAnswer) {
    return res.send({ response: 'NoAllowed' });
  }
  //logged out user can't answer
  else if (!isLogged && postInfo.isAnswer) {
    return res.send({ response: 'NoAllowed' });
  }
  //only logged in users can answer his own questions
  else if (isLogged == user && postInfo.isAnswer) {
    questionHandler.setAnswer(postInfo.questionId, postInfo.answer)
      .then(() => {
        res.send({ response: 'Successful' })
      })
      .catch(err => {
        res.send({ response: 'Unsuccessful' })
      });
    return;
  }

  else {
    let date = new Date().toLocaleString();
    questionHandler.setQuestion(req.params.user, postInfo.question, date)
      .then(() => res.send({ response: 'Successful' }))
      .catch(err => {
        res.send({ response: 'Unsuccessful' })
      });
  }
}

//retrieves current user's profile from db
function getProfile(req, res) {
  users.getUser(req.params.user)
    .then(result => {
      if (result.length)
        res.sendFile(path.join(__dirname, '/public/profile-assets', 'profile.html'));
      else
        res.redirect('/');
    })
}
//retrieves user that was searched for in search bar
function getUser(req, res) {
  const user = req.params.user;
  if (req.user) {
    users.getUser(user).then(result => {
      if (!result.length)
        res.send({ response: 'NotFound' });
      else if (result.username == user)
        res.send({ response: 'Same' });
      else
        res.send({ response: 'Successful' });
    }).catch((err) => {
      return { response: 'Query error in users table' };
    });
  } else {
    res.redirect('/');

  }
}
//gets user icon that they chose on registration?
function getImageId(req, res) {
  const user = req.params.user
  users.getImageId(user).then(imageid => {
    res.send({ id: imageid })
  }).catch((err) => {
    return { response: `Query error in users table couldn't get the imageID` };
  });
}

//{direction: "left"/"right"} Return={response:"Successful/Unsuccessful" data: 3(imageID)}
//adds user icon if they're a registered user
function setImageId(req, res) {
  const user = req.params.user;
  const direction = req.body.direction;
  if (req.user == user) {//only the account owner can change his icon!

    users.setImageId(user, direction)
      .then(() => {
        users.getImageId(user)
          .then(id => {
            res.send({ response: 'Successful', data: id })
          })
          .catch(err => {
            res.send({ response: 'Unsuccessful', data: 'default' });
          })
      })
  }
}

module.exports = { home, register, login, getUserQuestions, setQuestionOrAnswer, getQuestionsQuantity, getProfile, getUser, getImageId, setImageId };
