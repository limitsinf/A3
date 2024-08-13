const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/pages'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
