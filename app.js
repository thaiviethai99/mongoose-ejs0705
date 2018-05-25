const express = require('express');
const { urlencoded } = require('body-parser');

const { Singer } = require('./singer');

const app = express();

app.use(urlencoded({ extended: false }));

app.locals.isDev = process.env.NODE_ENV !== 'production';
if (process.env.NODE_ENV !== 'production') {
    const reload = require('reload');
    reload(app);
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singers', { singers }));
});

app.get('/add', (req, res) => res.render('create'));

app.post('/add', (req, res) => {
    const { name, image, link } = req.body;
    const singer = new Singer({ name, link, image });
    singer.save()
    .then(s => res.redirect('/'))
    .catch(error => res.send(error.message));
});

app.get('/update/:_id', (req, res) => {
    Singer.findById(req.params._id)
    .then(singer => {
        if (!singer) throw new Error('Cannot find singer');
        res.render('update', { singer });
    })
    .catch(error => res.send(error.message));
});

app.post('/update/:_id', (req, res) => {
    const { name, image, link } = req.body;
    Singer.findByIdAndUpdate(req.params._id, { name, link, image })
    .then(singer => {
        if (!singer) throw new Error('Cannot find singer');
        res.redirect('/');
    })
    .catch(error => res.send(error.message));  
});

app.get('/remove/:_id', (req, res) => {
    const { _id } = req.params;
    Singer.findByIdAndRemove(_id)
    .then(singer => {
        if (!singer) throw new Error('Cannot find singer');
        res.redirect('/');
    })
    .catch(error => res.send(error.message));
});

module.exports = { app };
