const express = require('express');
const app = express();
const cors = require('cors');
const HOST = '127.0.0.1';
const PORT = 8080;


app.use( (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});


app.use(express.static('public'));
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use(cors({ credentials: true, origin: true }));
app.options('*', cors()) 



app.use('/message', require('./controllers/messageController'));


app.use( (req, res, next) => {
    let err = new Error(`Not Found ${req.method}:${req.originalUrl}`);
    err.status = 404;
    next(err);
})



app.listen(PORT, HOST, () => {
    console.log(`Server initialized at ${HOST}:${PORT}`);
});


module.exports = app;