const express = require('express');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean0705')
.then(() => console.log('Database connected'))
.catch(error => console.log('Cannot connect database', error));

const singerSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    link: { type: String, require: true, unique: true, trim: true },
    image: { type: String, required: true, unique: true, trim: true }
});

const Singer = mongoose.model('Singer', singerSchema);

const app = express();

app.use(urlencoded({ extended: false }));

app.locals.isDev = process.env.NODE_ENV !== 'production';
if (process.env.NODE_ENV !== 'production') {
    const reload = require('reload');
    reload(app);
}

// Singer.insertMany([
//     { name: 'Karik', link: 'https://mp3.zing.vn/nghe-si/Karik', image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/a/0/a0927398989d4c5b18c56880bd56442b_1509531352.jpg' },
//     { name: 'Đức Phúc', link: 'https://mp3.zing.vn/nghe-si/Duc-Phuc', image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/d/7/d7f34aa6b1112e4b605f6c6e7eccd162_1509437674.jpg' },
//     { name: 'Châu Khải Phong', link: 'https://mp3.zing.vn/nghe-si/Chau-Khai-Phong', image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/c/a/ca59799621e1c9fd8652cd947713acfa_1509951552.jpg' },
// ])
// .then(x => console.log(x))
// .catch(error => console.log(error));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Singer.find({})
    .then(singers => res.render('singers', { singers }));
});

app.get('/add', (req, res) => res.render('create'));

app.post('/add', (req, res) => {
    // const { name, image, link } = req.body;
    // res.send(req.body);
});

app.get('/update/:_id', (req, res) => {
    // const singer = singers.find(s => s.id === req.params.id);
    // if (!singer) return res.send('Khong tim thay singer');
    // res.render('update', { singer });
});

app.post('/update/:_id', (req, res) => {
    // const singer = singers.find(s => s.id === req.params.id);
    // if (!singer) return res.send('Khong tim thay singer');
    // const { name, link, image } = req.body;
    // singer.name = name;
    // singer.image = image;
    // singer.link = link;
    // res.redirect('/singers');
});

app.get('/remove/:_id', (req, res) => {
    // const index = singers.findIndex(singer => singer.id === req.params.id);
    // if (index === -1) return res.send('Khong tim thay singer');
    // singers.splice(index, 1);
    // res.redirect('/singers');
});

app.listen(process.env.PORT || 3000, () => console.log('Server started'));
