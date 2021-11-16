const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const dataPath = path.join(__dirname, "data");
// accounts.json file?
let accountsList = require(path.join(dataPath, "accounts.json"))

// const SECRET =??

function saveList() {
  //Not sure what the undefined and 2 do here?
  fs.writeFileSync(path.join(dataPath, "accounts.json"), JSON.stringify(accountList, undefined, 2));
}

//users or user? or user/s id?
//element?
function getUserObject(user) {
  return accountsList.find((element) => element["user"].toLowerCase() === user.toLowerCase());
}

function getAccountUser(user, password) {
  if (getUserObject(user)) if (getUserObject(user)["password"] == password)
    return user;
  //why undefined?
  return undefined;
}

function tokenifyAccount(account) {
  newAccount(account.user, account.password);
  return jwt.sign(account, SECRET);
}

//do we use temporary accounts on our page?
function checkRegisteredUser(token) {
  let tempAcc = jwt.verify(token, SECRET);
  return getAccountUser(tempAcc["user"], tempAcc["password"]);
}

module.exports = {
  checkRegisteredUser, tokenifyAccount
}