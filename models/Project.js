const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    projectName: String,
    createdModels: [{ type: Schema.Types.ObjectId, ref: "CreatedModel" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
