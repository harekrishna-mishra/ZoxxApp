const jwt = require("jsonwebtoken")
const Users  = require("../models/UserSchema")


const auth = async (req,res,next) => {
    try {
        const { authorization } = req.headers;
        const [bearer, token] = authorization?.split(" ")
        
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "ZOXX_SECRET_KEY")
        const user = await Users.findOne({_id:verifyToken.id})
        console.log(user)
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({message:"User not found"})
        console.log(error)
    }
}

module.exports = auth;