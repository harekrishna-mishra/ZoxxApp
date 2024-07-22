const express = require("express")
const {registerUser,loginUser,searchUser,followUser,unfollowUser,uploadDP} = require("../controllers/UserControllers")
const Auth = require("../middlewares/Auth")

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/search",searchUser)
userRouter.post("/follow",Auth,followUser)
userRouter.post("/unfollow",Auth,unfollowUser)
userRouter.put ("/uploadDP",uploadDP)

module.exports = userRouter;