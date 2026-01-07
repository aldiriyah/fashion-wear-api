import mongoose from "mongoose";

const contentDataSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed, // Flexible content structure
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentData = mongoose.model("ContentData", contentDataSchema);

export default ContentData;
