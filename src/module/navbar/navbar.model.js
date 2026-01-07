import { model, Schema } from "mongoose";

const navbarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Navbar = model("Navbar", navbarSchema);
