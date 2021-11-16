const PORT = process.env.PORT || 3000;
const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser')
/*I wrote these as per our last project and modified the names - 
mario also suggested we move them out of the handlers folder since they weren't handlers*/
const authHandler = require("./handlers/auth")
const questionHandler = require("./handlers/questions")


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(express.static('assets'));
app.use(express.static('public'));

//user or username?
app.use((req, res, next) => {
  const token = req.cookies.account
  if (token) {
    //auth since it's auth.js
    const user = authHandler.checkRegisteredUser(token);
    if (user) req.user = user;
  }
  next();
})

//checks via cookies if user is logged in and redirects them back to log-in if not?
app.get("/", (req, res) => {
  //user or username?
  if (req.user) {
    res.redirect(`/profile/${req.user}`)
    return;
  }
  //
  res.sendFile("./public/login/login.html");
});
//so I'm going to stop here since I'm not sure of what I'm doing.



//logs out user by deleting cookie
app.get("/logout", (req, res) => {
  res.clearCookie("account");
  res.send({ worked: true });
});

//redirects unknown routes to default?
app.get("/*", (req, res) => {
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

