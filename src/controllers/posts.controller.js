import Post from "../models/post.model.js";

// creatin a post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const post = await Post.create({
      content: content.trim(),
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while creating post",
      error: error.message,
    });
  }
};

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false })
      .sort({ lastActivityAt: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Posts fetched successfully",
      count: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching posts",
      error: error.message,
    });
  }
};


// get a Single post 
const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const post = await Post.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching post",
      error: error.message,
    });
  }
};


// update post content
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const post = await Post.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        content: content.trim(),
        // lastActivityAt: new Date(), dont update the activity
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while updating post",
      error: error.message,
    });
  }
};



// soft delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const post = await Post.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Your Post has been Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while deleting post",
      error: error.message,
    });
  }
};


export { createPost, getAllPosts, getSinglePost, updatePost, deletePost };




