const express = require('express')
const connectDB = require('./config/db.js')

const app = express();
require('dotenv').config()

//* DB connection
connectDB();

//* Initilize middleware
app.use(express.json({extended: false}))


//code below used for deployment, comment for dev.. uncommment for production



app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})



//End production code


//? Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running  ${PORT}`))