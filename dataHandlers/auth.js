const users = require('../database/users');
const jwt = require("jsonwebtoken");

const SECRET = "lnvz2342dnv89nSDJkout345";

//async & await is missing.
function checkCredential(user, password) {//async function checkCredential(user, password
  const account = users.getUser(user);//awiat users.getUser(user)
  if (!account)
    return { response: 'NotFound' };
  else if (account[0].password != password)
    return { response: 'WrongPassword' };
  else
    return { response: 'Successful' };
}

//cipher the account in the cookie realm
function encodeAccount(account) {
  return jwt.sign(account, SECRET);
}

function decodeAccount(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { checkCredential, encodeAccount, decodeAccount }