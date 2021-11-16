const express = require("express");
const router = require("./router");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(router)
app.use(express, static('assets'));
app.use(express, static('public'));

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
