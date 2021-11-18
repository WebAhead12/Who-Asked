const db = require('../database/connection');

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

function getImageId(user) {
    return db.query(`SELECT imageid FROM users WHERE username = '${user}'`)
        .then(result => {
            const id = result.rows;
            return id[0].imageid;
        }).catch(err => {
            return { response: `Coudln't get ImageID` };
        })

}

//{direction: "left"/"right"} Return={response:"Successful/Unsuccessful" data: 3(imageID)}
function setImageId(user, direction) {
    return getImageId(user).then(id => {
        if (direction == 'right') {
            id++;
            id %= 8;
        } else {
            id--;
            if (id == -1)
                id = 7;
        }
        return db.query(`UPDATE users SET imageId = ${id} WHERE username = '${user}'`)
            .catch(err => {
                return { response: `Coudln't set ImageID` };
            })
    })
}

module.exports = { getUser, setUser, getUserId, setImageId };