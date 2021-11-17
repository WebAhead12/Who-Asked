# Who-Asked

# Database Schema
<img src = "https://github.com/WebAhead12/Who-Asked/blob/main/Assets/Diagrams/Database.svg"> </img>

# Server routes:
- /
- Post /register {username:"", password:""} Return={response:"UsernameTaken/Success"}
- Post /login {username:"", password: ""} Return={response: "NotFound/WrongPassword/Successful"} (If found redirect to /profile/:user)
- Get /logout Redirect to /

- Get /data/:user/:page {page: ""} Return={data:[{question:"", answer:""}]}
- Post /data/:user {isAnswer: true/false, username: "", question: "", questionId:"", answer: ""} Return={response:"Unsuccessful/Successful"}

- Get /profile/:user
- Get /image/:user Return={id:""}
- Post /image/:user {id:""} Return={response:"Successful/Unsuccessful"}
- Get /view/:user Return={response:"NotFound/Successful/Same"}
- Default routes back to /

# Folder Structure
- database
	- connection.js
	- init.sql
	- build.js
	- users.js
	- questions.js
- assets
	- icons
	- diagrams
- public
	- Profile
		- profile.html
		- profile.css
		- profile.js
	- Login
		- login.html
		- login.css
		- login.js
- dataHandlers
	- auth.js
	- questions.js
- server.js
- router.js
- handler.js
- .env
- package.json

# Features
- Register an account.
- Login into an account.
- Choose account icon.
- Answer anonymous questions.
- Search and view other users profile.
- Ask other users questions anonymously.

# Wireframes
![image](https://user-images.githubusercontent.com/26445697/141996117-1346782b-81c5-428d-af6c-5410a111e3cb.png)
