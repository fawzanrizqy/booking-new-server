if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const Controller = require('./controllers/controller');
const app = express()
const port = process.env.PORT || 3000;
const { authUser } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// *route:
app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.use(authUser);
app.post('/book', Controller.book)
app.get('/gedung', Controller.getGedung)
app.get('/ruang/:id', Controller.getRuang)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Booking app listening on port ${port}`)
})