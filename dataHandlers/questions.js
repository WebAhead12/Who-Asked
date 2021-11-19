const db = require('../database/connection');
const users = require('./users');

function getQuestions(user) {
    //func(user) return user_id
    return users.getUserId(user).then(id => {
        return db.query(`SELECT * FROM posts`)
            .then(result => {
                const posts = result.rows;
                return { data: posts.filter(post => post.user_id == id), response: 'Success' };
            }).catch(err => {
                return { response: 'Query error in posts table, unable to get questions' };
            })
    }).catch(err => {
        return { response: `Couldn't get ${user} user ID` };
    })
}

function setQuestion(user, question, date) {
    return users.getUserId(user).then(id => {
        const values = [question, id, date];
        return db.query(`INSERT INTO posts(question, user_id, date) VALUES($1, $2, $3)`, values)
            .catch(err => {
                return { response: 'Insertion error, unable to set question.' };
            });
    }).catch(err => {
        return { response: `Couldn't get ${user} user ID` };
    });
}

function setAnswer(questionId, answer) {
    return db.query(`UPDATE posts SET answer = ${answer} WHERE id = ${questionId}`)
        .catch(err => {
            return { response: 'Insertion error, unable to set answer.' };
        });
}

function viewQuestions(pageNumber, user) {
    return getQuestions(user).then(questions => {
        const start = (pageNumber - 1) * 10;
        const end = pageNumber * 10 - 1;
        return { data: questions.data.slice(start, end) };
    })
}

module.exports = { getQuestions, setQuestion, setAnswer, viewQuestions };
