const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });
        console.log('Database connected');
    }catch(err){
        console.error(err.message)
    }
}

module.exports = connectDB