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
            req.user = user;
    }
    next();
})

app.use(router);

//logs out user by deleting cookie
app.get("/logout", (req, res) => {
    res.clearCookie("account");
    res.redirect('/');
});

app.use(express.static('assets'));

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

