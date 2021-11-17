const db = require('./connection');
const users = require('./users');

function getQuestions(user) {
    //func(user) return user_id
    return users.getUserId(user).then(id => {
        return db.query(`SELECT * FROM posts`)
            .then(result => {
                const posts = result.rows;
                return { data: posts.filter(post => post.user_id == id), response: 'Success' };
            }).catch(err => {
                return { response: 'Query error in posts table' };
            })
    }).catch(err => {
        return { response: `Couldn't get ${user} user ID` };
    })
}


module.exports = { getQuestions };