const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')
const app = express();
require('dotenv').config()
const path = require('path')
app.use(cors())
//* DB connection
connectDB();

//* Initilize middleware
app.use(express.json({extended: false}))





//? Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))


//Code below used for deployment 

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running  ${PORT}`))