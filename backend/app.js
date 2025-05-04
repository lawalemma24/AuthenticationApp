const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoute')
const productRoutes = require('./routes/productRoute')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require ('cookie-parser')
const {connectDB} = require('./connectDb/connectDb')
const path = require ('path')

port = 2000
const _dirname = path.resolve()
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
dotenv.config()
app.use(cors ({ origin : "http://localhost:5173", credentials: true}))
app.use(express.json())
// app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname,"/client/dist")))
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(_dirname, "client","dist","index.html"))
    })
}   



app.listen(port, () => {
    connectDB();
    console.log(`listening on ${port}`);
    
})