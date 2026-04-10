import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300 ,
    },

    // 👤 optional (future use - auth ke liye)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // 🔥 Activity-based expiry ka core field
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },

    // 💬 replies count (fast access ke liye)
    repliesCount: {
      type: Number,
      default: 0,
    },

    // 🚫 optional control
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto
  }
);

export default mongoose.model("Post", postSchema);