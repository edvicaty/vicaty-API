const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    image: {
      type: String,
      default:
        "https://cnet1.cbsistatic.com/img/FLKvlrT-YBkKwhGm1mQAz1EwtP8=/940x0/2017/10/26/7dc9c97a-345d-4223-9bb4-55370079975c/el-chavo-1.jpg",
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
