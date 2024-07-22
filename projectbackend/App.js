const cookieParser = require("cookie-parser")
const express = require("express")
const connectDB = require("./db/Connection")
const userRouter = require("./routes/UserRoutes")
const postRouter = require("./routes/PostRoutes")
const cors = require("cors")
const auth = require("./middlewares/Auth")

const app = express()
app.use(cors())

//import Schema
const Users = require("./models/UserSchema")

//MongoConnection
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const port = process.env.PORT || 8000

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.use("/user",userRouter)
app.use("/post",auth,postRouter)

app.listen(port,()=>{
    console.log("Server is running on port 8000")
})