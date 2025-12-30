import mongoose from "mongoose";
import { User } from "../module/user/user.model.js";
import { users } from "./data/users.js";
import dotenv from "dotenv";
import { Footer } from "../module/features/features.model.js";
import { defaultFooterData } from "./data/footer.js";

dotenv.config();

async function main() {
  console.log("🌱 Starting seed process...");
  await mongoose.connect(process.env.DATABASE_URL);
  try {
    const existingAdmin = await User.findOne({ email: users[0].email });
    if (existingAdmin) {
      console.log("✅ Admin user already exists, skipping creation");
    } else {
      await User.create(users[0]);
      console.log("✅ Admin user created successfully");
    }

    const existingFooter = await Footer.findOne({
      title: defaultFooterData.title,
    });
    if (existingFooter) {
      await Footer.findOneAndUpdate(
        { title: defaultFooterData.title },
        defaultFooterData,
        { new: true, runValidators: true }
      );
      console.log("✅ Footer updated successfully");
    } else {
      await Footer.create(defaultFooterData);
      console.log("✅ Footer created successfully");
    }

    console.log("🌱 Seed process completed successfully");
  } catch (error) {
    console.error("🌱 Seed process failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
