import { Schema, model, } from "mongoose";

const bannerSchema = new Schema(
  {
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Banner = new model("Banner", bannerSchema);
