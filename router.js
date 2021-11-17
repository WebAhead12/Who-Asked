//is Router supposed to be capitalized?
const router = express.Router();
const express = require('express');
const handlers = require('./handler');


router.get('/', handlers.home);
router.post('/register', handlers.register);
router.post('/login', handlers.login);
router.get('/data/:user', handlers.getUserQuestions);
router.post('/data/:user', handlers.setQuestionOrAnswer);
router.get('/profile/:user', handlers.getProfile);//when log in
router.get('/view/:user', handlers.getUser); //when search
router.get('/image/:user', handlers.getImageId);
router.post('/image/:user', handlers.setImageId);
router.use((req, res) => {//strange route => redirect to homepage
    res.redirect('/');
})




module.exports = router;