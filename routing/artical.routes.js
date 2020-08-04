const articalRouter = require('express').Router();
const mysql = require('../database/db');

//save data form of add articals to routeDB in table blog
articalRouter.post('/addNewArtical', async(req, res) => {
    let artical = {
        articalTitle: req.body.articalTitle,
        articalContent: req.body.articalContent
    };
    await mysql.execute(`INSERT INTO blog ( articalTitle, articalContent, publishDate ) VALUES ( '${artical.articalTitle}', '${artical.articalContent}',now())`);
    res.redirect('/');
});

//delete selected data from blog
articalRouter.get('/delete/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`DELETE FROM blog WHERE id = ${id}`);
    res.redirect('/');
});

//edit selected data from blog table
articalRouter.get('/edit/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`SELECT * FROM blog WHERE id = ${id}`).then(([result]) => {
        res.render('editArtical', { result });
    })

});

//post edited data to blog table
articalRouter.post('/editArtical/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`UPDATE blog SET articalTitle = '${req.body.articalTitle}', articalContent = '${req.body.articalContent}' WHERE id = ${id} `);
    res.redirect('/');
});

//get specific data from blog table
articalRouter.get('/readMore/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`SELECT id, articalTitle, articalContent, publishDate FROM blog WHERE id=${id}`).then(([result]) => {
        res.render('readMoreArtical', { result });
    })
});

//sarch in titles from blog table
articalRouter.get('/readMore/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`SELECT id, articalTitle, articalContent, publishDate FROM blog WHERE id=${id}`).then(([result]) => {
        res.render('readMoreArtical', { result });
    })
});
//sarch in titles from blog table
articalRouter.get('/search', async(req, res) => {
    let search = req.query.search;
    await mysql.execute(`SELECT * FROM blog WHERE articalTitle LIKE '%${search}%'`).then(([result]) => {
        res.render('readMoreArtical', { result });
    })
});

//export module to be used in server file
module.exports = articalRouter;