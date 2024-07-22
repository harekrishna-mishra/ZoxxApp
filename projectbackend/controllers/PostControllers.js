const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

const newPost = async (req, res) => {
  try {
    const { caption, url, userId } = req.body;
    if (!url || !userId) {
      res.status(400).json({ message: "Please fill all the required fields" });
    }
    const createPost = new Post({
      caption: caption,
      video: url,
      user: userId,
    });

    await createPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error Occure" });
  }
};

const viewUserPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.user;

    const posts = await Post.find({ user: userId })
      .populate("user", "_id username email followers following url")
      .sort({ createdAt: -1 }); // Sorting in descending order

    const targetUser = await User.findOne({ _id: userId });

    console.log(targetUser);

    const isFollowed =
      posts.length > 0
        ? posts[0].user.followers.includes(userData._id)
        : targetUser.followers.includes(userData._id);

    console.log(posts[0]?.user?.followers?.includes(userData._id));

    if (posts.length === 0) {
      return res.status(200).json({
        message: "0 posts found for this user",
        user: userData,
        isFollowed,
      });
    }

    res.status(200).json({ posts, isFollowed });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = viewUserPost;

const viewAllPost = async (req, res) => {
  try {
    const allPost = await Post.find()
      .populate("user", "_id username email url")
      .sort({ createdAt: -1 });
    if (allPost.length > 0) {
      res
        .status(200)
        .json({ message: "All Post Fetched Successfully", allPost });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const likePost = async (req, res) => {
  try {
    const targetPost = await Post.findById(req?.body?.targetPost);
    const currUser = await User.findById(req?.user?._id);

    // if(!targetPost){
    //   return res.status(404).json({ message: "This post is not found." });
    // }

    const isLikes = targetPost.likes.includes(currUser._id);
    if (isLikes) {
      return res.status(400).json({ message: "Already Liked" });
    }

    targetPost.likes.push(currUser?._id);
    await targetPost.save();

    res
      .status(200)
      .json({ message: "Liked successfully", currUser, targetPost });
  } catch (error) {
    res.json(error);
  }
};

const unLikePost = async (req, res) => {
  try {
    const targetPost = await Post.findById(req?.body?.targetPost);
    const currUser = await User.findById(req?.user?._id);

    const isLikes = targetPost.likes.includes(currUser._id);
    if (!isLikes) {
      return res.status(400).json({ message: "Already Unliked" });
    }

    targetPost.likes = targetPost.likes.filter((id) => {
      return id.toString() !== currUser?._id.toString();
    });

    await targetPost.save();

    res
      .status(200)
      .json({ message: "unLiked successfully", currUser, targetPost });
  } catch (error) {
    res.json(error);
  }
};

const createComent = async (req, res) => {
  const { postId } = req.body;
  const { comment } = req.body;
  const userId = req?.user?._id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    post.comments.push({ user: userId, comment });
    await post.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const viewComent = async (req, res) => {
  const { postId } = req.body;

  try {
    console.log('Fetching post with ID:', postId);

    const post = await Post.findById(postId)
      .populate({
        path: 'comments.user',  
        select: '_id username email url'  
      });

    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: "Post not found" });
    }

    console.log('Post found:', post);
    return res.status(200).json(post);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  newPost,
  viewUserPost,
  viewAllPost,
  likePost,
  unLikePost,
  createComent,
  viewComent,
};
