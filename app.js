if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const Controller = require('./controllers/controller');
const app = express()
const port = process.env.PORT || 3000;
//const route = require('./routes/route');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


route:
app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.post('/book', Controller.book)
app.get('/gedung', Controller.getGedung)
app.get('/ruang/:id', Controller.getRuang)


app.listen(port, () => {
    console.log(`Booking app listening on port ${port}`)
})