const users = require('./users');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()


const SECRET = process.env.SECRET;


function checkCredential(user, password) {

  return users.getUser(user).then(result => {
    if (!result.length)
      return { response: 'NotFound' };
    if (result[0].password != password)
      return { response: 'WrongPassword' };
    else
      return { response: 'Successful' };
  }).catch((err) => {
    return { response: 'Query error in users table' };
  });
}

//cipher the account in the cookie realm
function encodeAccount(account) {
  return jwt.sign(account, SECRET);
}

function decodeAccount(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { checkCredential, encodeAccount, decodeAccount }