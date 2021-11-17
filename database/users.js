const db = require('./connection');

function getUser(user) {
    return db.query(`SELECT * FROM users`)
        .then(result => {
            const users = result.rows;
            return users.filter(account => account.username == user)//theResult = [{id: num, username: user, password: pass, imageId: num}] |if user not exist =>theResult = []
        })
}

function setUser(user, password, imageId = '') {
    const values = [user, password, imageId];
    return db.query(`INSERT INTO users(username, password, imageId) VALUES($1, $2, $3)`, values);
}

function getUserId(user) {
    return getUser(user).then(result => result[0].id)
}

module.exports = { getUser, setUser, getUserId };