const db = require("./databse/connection")


//home handler returns index.html file
function home(req, res) {

}


//post request, register takes username + password, adds user to db, redirect to profile
function register(req, res) {

}


//username + password match, redirects to profile
function login(req, res) {

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
function getImageid(req, res) {

}


//adds user icon if they're a registered user
function setImageId(req, res) {

}


//not sure what to do here since the logout function in our last project was in the script.js
function logout(req, res) {

}

