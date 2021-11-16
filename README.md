# Who-Asked

# Database Schema
<img src = "https://github.com/WebAhead12/Who-Asked/blob/main/Assets/Diagrams/Database.svg"> </img>

# Folder routes:
- /
- Post /register {username:"", password:""} Return={response:""}
- Post /login {username:"", password: ""} Return={response: ""}
- Get /logout

- Get /data/:user {page: ""} Return={data:[{question:"", answer:""}]}
- Post /data/:user {isAnswer: true/false, username: "", question: "", questionId:"", answer: ""} Return={response:""}

- Get /profile/:user
- Get /view/:user

# Folder Structure
- database
	- connection.js
	- init.sql
	- build.js
	- user.js
	- questions.js
- public
	- index.html
	- style.css
	- script.js
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
## Home Page
<img src="https://github.com/WebAhead12/Who-Asked/blob/main/Assets/Diagrams/Register.svg"> </img>
