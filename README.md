# Who-Asked

# Database Schema
<img src = "https://github.com/WebAhead12/Who-Asked/blob/main/Assets/Diagrams/Database.svg"> </img>

# Server routes:
- /
- Post /register {username:"", password:""} Return={response:""}
- Post /login {username:"", password: ""} Return={response: ""}
- Get /logout

- Get /data/:user {page: ""} Return={data:[{question:"", answer:""}]}
- Post /data/:user {isAnswer: true/false, username: "", question: "", questionId:"", answer: ""} Return={response:""}

- Get /profile/:user
- Get /image/:user Return={id:""}
- Post /image/:user {id:""} Return={response:""}
- Get /view/:user

# Folder Structure
- database
	- connection.js
	- init.sql
	- build.js
	- user.js
	- questions.js
- public
	- Profile
		- profile.html
		- profile.css
		- profile.js
	- Login
		- login.html
		- login.css
		- login.js
- handlers
	- auth.js
	- questions.js
- server.js
- router.js
- handler.js
- .env
- package.json

# Features
- Ask questions anonymously
- Answer anonymous questions
- Search and view other users' questions 

# Wireframes
![image](https://user-images.githubusercontent.com/26445697/141988967-72f2e54f-b5c5-4809-a5f0-aec46f97d336.png)
