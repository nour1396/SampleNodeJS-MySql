const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 1996;
const articalRouter = require('./routing/artical.routes');
const mysql = require('./database/db');

//static path for css and javascript files
app.use(express.static(path.join(__dirname, 'assets')));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//set view engine
app.set('view engine', 'ejs');

//routing files
app.use(articalRouter);

//get home page / 
app.get('/', (req, res) => {
    //show all articals in db 
    mysql.execute(`SELECT * FROM blog`).then(([result]) => {
        res.render('index', { result });
    })
})

//listening of port 
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});