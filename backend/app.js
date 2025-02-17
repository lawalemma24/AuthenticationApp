const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoute')
const productRoutes = require('./routes/productRoute')
const dotenv = require('dotenv')
const cookieParser = require ('cookie-parser')
const {connectDB} = require('./connectDb/connectDb')



port = 2000
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
dotenv.config()
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
    connectDB();
    console.log(`listening on ${port}`);
    
})