const express = require("express")
const postRouter = express.Router();
const {newPost,viewUserPost,viewAllPost,likePost, unLikePost,createComent,viewComent} = require("../controllers/PostControllers")


postRouter.post("/newPost",newPost)
postRouter.get('/profile/:id',viewUserPost)
postRouter.get("/reels",viewAllPost)
postRouter.put("/likePost",likePost)
postRouter.put("/unLikePost",unLikePost)
postRouter.put("/createComent",createComent)
postRouter.post("/viewComent",viewComent)

module.exports = postRouter;