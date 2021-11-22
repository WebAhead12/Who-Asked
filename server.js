const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser')
const auth = require('./dataHandlers/auth');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(express.json());

//Handles the user login cookies.
app.use((req, res, next) => {
    const token = req.cookies.account
    if (token) {
        const user = auth.decodeAccount(token);
        if (user)
            req.user = user.username;
    }
    next();
})

//logs out user by deleting cookie
app.get("/logout", (req, res) => {
    res.clearCookie("account");
    res.redirect('/');
});

app.use(router);

app.use(express.static('Assets'));

app.use(express.static('public'));

app.use((req, res) => {//strange route => redirect to homepage
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

