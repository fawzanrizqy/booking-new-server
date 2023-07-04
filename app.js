if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors')
const app = express()
const port = 3000 //process.env.PORT || 3000;
//const route = require('./routes/route');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use('/', route);
//route example:
//app.post('/register', Controller.register)

app.listen(port, () => {
    console.log(`Booking app listening on port ${port}`)
})