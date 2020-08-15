const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 1996;
const articleRouter = require('./routing/article.routes');
const mysql = require('./database/db');

//static path for css and javascript files
app.use(express.static(path.join(__dirname, 'assets')));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//set view engine
app.set('view engine', 'ejs');

//routing files
app.use(articleRouter);

//get home page / 
app.get('/', (req, res) => {
    //show all articles in db 
    mysql.execute(`SELECT * FROM blogs`).then(([result]) => {
        res.render('index', { result });
    })
})

//listening of port 
app.listen(process.env.PORT||port, () => {
    console.log(`server is listening on port ${port}`);
});
