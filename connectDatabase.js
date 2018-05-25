const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean0705')
.then(() => console.log('Database connected'))
.catch(error => console.log('Cannot connect database', error));
