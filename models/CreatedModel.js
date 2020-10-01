const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createdModelSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    createdModelName: String,
    api: {},
    description: String,
    elements: [],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

exports.CreatedModel = mongoose.model("CreatedModel", createdModelSchema);
exports.createdModelSchema = createdModelSchema;
