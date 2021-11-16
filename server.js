const express = require('express');
const router = router('./router');
const cookieParser = requier('cookie-parser')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(express.static('assets'));
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

