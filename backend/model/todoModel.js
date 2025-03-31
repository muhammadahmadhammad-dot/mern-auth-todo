import mongoose from "mongoose";

const Todos = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to User model
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("Todos", Todos);
