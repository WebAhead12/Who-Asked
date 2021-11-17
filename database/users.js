const db = require("./connection");

function getUser(user) { //ask mario async/await
    let theResult = []; // line 2, 12 will not work async!
    db.query(`SELECT * FROM users`)
        .then(result => {
            const users = result.rows;
            theResult = users.username.filter(username => username == user)//theResult = [{id: num, username: user, password: pass, imageId: num}] |if user not exist =>theResult = []
        })
        .catch(err => {
            console.log('something went wrong with getting user from database');
            console.log(err);
        })
    return theResult; // line 2, 12 will not work async!
}

function setUser(user, password, imageId = '') {
    const values = [user, password, imageId];
    db.query(`INSERT INTO users(username, password, imageId) VALUES($1, $2, $3)`, values)
        .catch(err => {
            console.log('register failed couldn`t insert a new user');
            console.log(err);
        })
}

module.exports = { getUser, setUser };