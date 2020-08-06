const articleRouter = require('express').Router();
const mysql = require('../database/db');

//save data form of add articles to routeDB in table blogs
articleRouter.post('/addNewarticle', async(req, res) => {
    let article = {
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent
    };
    await mysql.execute(`INSERT INTO blogs ( articleTitle, articleContent, publishDate ) VALUES ( '${article.articleTitle}', '${article.articleContent}',now())`);
    res.redirect('/');
});

//delete selected data from blogs
articleRouter.get('/delete/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`DELETE FROM blogs WHERE id = ${id}`);
    res.redirect('/');
});

//edit selected data from blogs table
articleRouter.get('/edit/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`SELECT * FROM blogs WHERE id = ${id}`).then(([result]) => {
        res.render('editArticle', { result });
    })

});

//post edited data to blogs table
articleRouter.post('/editArticle/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`UPDATE blogs SET articleTitle = '${req.body.articleTitle}', articleContent = '${req.body.articleContent}' WHERE id = ${id} `);
    res.redirect('/');
});

//get specific data from blogs table
articleRouter.get('/readMore/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`SELECT id, articleTitle, articleContent, publishDate FROM blogs WHERE id=${id}`).then(([result]) => {
        res.render('readMorearticle', { result });
    })
});

//sarch in titles from blogs table
articleRouter.get('/readMore/:id', async(req, res) => {
    let id = req.params.id;
    await mysql.execute(`SELECT id, articleTitle, articleContent, publishDate FROM blogs WHERE id=${id}`).then(([result]) => {
        res.render('readMorearticle', { result });
    })
});

//sarch in titles or content or both from blogs table
articleRouter.get('/search', async(req, res) => {
    let search = req.query.search;
    let searchType = req.query.searchType;
    if (searchType.constructor == String) {
        await mysql.execute(`SELECT * FROM blogs WHERE ${searchType} LIKE '%${search}%'`).then(([result]) => {
            res.render('readMorearticle', { result });
        })
    } else {
        let searchTypeArray = [];
        searchType.forEach(h => {
            searchTypeArray.push(h)
        })
        await mysql.execute(`SELECT * FROM blogs WHERE ${searchTypeArray[0]} LIKE '%${search}%' AND ${searchTypeArray[1]} LIKE '%${search}%' `).then(([result]) => {
            res.render('readMorearticle', { result });
        })
    }
});

//export module to be used in server file
module.exports = articleRouter;