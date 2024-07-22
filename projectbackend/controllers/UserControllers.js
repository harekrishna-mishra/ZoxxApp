const Users = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  const isExist = await Users.findOne({ email: email });
  try {
    if (isExist) {
      res.status(400).json({message:"User Already Exist."})
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await new Users({
        email: email,
        username: username,
        password: hashedPassword,
      });
      const newUser = await user.save();
      res.status(201).json({message:"Registration Successfull."})
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      res.status(400).json({message:"Invalid Email Or Password."})
    } else {
      const validate = await bcryptjs.compare(password, user.password);
      if (!validate) {
        res.status(400).json({message:"Invalid Email Or Password."})
      } else {
        const payload = {
            id: user._id,
            username: user.username
        }
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "ZOXX_SECRET_KEY";
        jwt.sign(payload,
            JWT_SECRET_KEY,
            { expiresIn : 43200 },
            (err, token)=>{
                if(err){
                    res.json({message:err})
                }
                return res.status(200).json({message:"Login Successfully.",token:token,user:user})
            })
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const searchUser = async (req, res) => {
  const { username } = req.query;
  console.log(username)

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username query parameter is required" });
  }
  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  try {
    const sanitizedUsername = escapeRegex(username);
    const users = await Users.find({
      username: { $regex: sanitizedUsername, $options: "i" },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const followUser = async (req,res) => {
  try {
    const targetUser = await Users.findById(req?.body?.targetId);
    const currUser = await Users.findById(req?.user?._id);

    if(!targetUser){
      return res.status(404).json({ message: "This user is not exist any more" });
    }

    if(currUser?.following.includes(targetUser._id)){
      return res.status(400).json({ message: "You are already following this user" });
    }

    currUser?.following.push(targetUser._id)
    targetUser?.followers.push(currUser._id)
    
    await currUser.save();
    await targetUser.save();

    res.status(200).json({ message: "User followed successfully",currUser,targetUser })
  } catch (error) {
    res.json(error)
  }
} 

const unfollowUser = async (req,res) => {
  try {
    const targetUser = await Users.findById(req?.body?.targetId);
    const currUser = await Users.findById(req?.user?._id);

    if(!targetUser){
      return res.status(404).json({ message: "This user is not exist any more" });
    }

    if(!currUser?.following.includes(targetUser._id)){
      return res.status(400).json({ message: "This user is not followed by you" });
    }

    currUser.following = currUser.following.filter((id)=>{
      /* console.log("jjj",id,"||",targetUser._id) */
      return id.toString() !== targetUser?._id.toString()
    })

    targetUser.followers = targetUser.followers.filter((id)=>{
      console.log(id.toString() !== currUser?._id.toString())
      return id.toString() !== currUser?._id.toString()
    })

    
    
    await currUser.save();
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully",currUser,targetUser })
  } catch (error) {
    res.json(error)
  }
} 

const uploadDP = async (req, res) => {
  try {
    const targetUser = await Users.findById(req?.body?.targetId);
    const url = (req?.body?.url)
    
    targetUser.url = url
    const updatedUser = await targetUser?.save();
    res
      .status(200)
      .json({ message: "Profile Picture Updated Successfully",updatedUser });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {registerUser,loginUser, searchUser , followUser,unfollowUser , uploadDP};
