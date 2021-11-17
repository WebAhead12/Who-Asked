const question = require('../database/questions');


function viewQuestions(pageNumber, user) {
    return question.getQuestions(user).then(questions => {
        const start = (pageNumber - 1) * 10;
        const end = pageNumber * 10 - 1;
        return { data: questions.data.slice(start, end) };
    })
}

module.exports = { viewQuestions };
