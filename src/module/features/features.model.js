import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // Company Information
    companyInfo: {
      logo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      companyRegistrationNumber: {
        type: String,
        required: true,
      },
      vatRegistrationNumber: {
        type: String,
        required: true,
      },
    },

    // Categories
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          default: "#",
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    // Information Links
    informationLinks: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    // Contact Information
    contactInfo: {
      email: {
        type: String,
        required: true,
      },
      phoneNumbers: [
        {
          number: {
            type: String,
            required: true,
          },
          label: {
            type: String,
            default: "",
          },
        },
      ],
    },

    
    socialMedia: [
      {
        platform: {
          type: String,
          enum: [
            "facebook",
            "instagram",
            "twitter",
            "linkedin",
            "youtube",
            "pinterest",
          ],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        icon: {
          type: String,
          default: "",
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    copyright: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Footer = mongoose.model("Footer", footerSchema);

