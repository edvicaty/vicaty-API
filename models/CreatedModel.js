const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createdModelSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    createdModelName: String,
    api: {},
    description: String,
    elements: [
      /*
      @ = user input

      {
      
      @name : {
        elementId: ModelId+@name,
        type: @String,
        required: @false
        default: @"pedrito",
        data: []
        }

      }
      
      */
    ],

    // TODO: Maybe add Objects and arrays as data (beware of the CRUD though)
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
