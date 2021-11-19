const express = require('express');
const router = express.Router();
const handlers = require('./handler');


router.get('/', handlers.home);
router.post('/register', handlers.register);
router.post('/login', handlers.login);
router.get('/totalquestions/:user', handlers.getQuestionsQuantity);
router.get('/data/:user/:page', handlers.getUserQuestions);
router.post('/data/:user', handlers.setQuestionOrAnswer);
router.get('/profile/:user', handlers.getProfile);//when log in
router.get('/view/:user', handlers.getUser); //when search
router.get('/image/:user', handlers.getImageId);
router.post('/image/:user', handlers.setImageId);

module.exports = router;