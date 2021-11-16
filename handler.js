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
//get request - takes user params and retrieves questions from db relating to user ID
function getUserQuestions(req, res) {

}
//adds question, user id, time(hopefully), questionId and (is) answer if available
function setQuestionOrAnswer(req, res) {

  // check if question already exists
  // SELECT * FROM questions WHERE question = userQuestion

  // if not add the question

  // if isAnswer is set to true then update the question's answer
  // UPDATE question WHERE id = questionId SET answer = userAnswer

}

function getProfile(req, res) {

}

function getUser(req, res) {

}

function getImageid(req, res) {

}

function setImageId(req, res) {

}

function logout(req, res) {

}

