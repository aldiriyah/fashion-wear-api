import status from "http-status";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../utils/sendResponse.js";
import Contact from "./contact.model.js";
import AppError from "../../error/appError.js";

const postContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Contact created successfully",
    data: contact,
  });
});

const getAllContact = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const result = await Contact.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Contact.countDocuments();
  const pagination = {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  };

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Contacts retrieved successfully",
    data: { data: result, pagination },
  });
});

// Get contact statistics
const getContactStats = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  // Calculate statistics
  const totalContacts = contacts.length;

  // Contacts by date (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentContacts = contacts.filter(
    (contact) => new Date(contact.createdAt) >= thirtyDaysAgo
  );

  // Group by date
  const contactsByDate = recentContacts.reduce((acc, contact) => {
    const date = new Date(contact.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Subjects frequency
  const subjectsCount = contacts.reduce((acc, contact) => {
    const subject = contact.subject || "No Subject";
    acc[subject] = (acc[subject] || 0) + 1;
    return acc;
  }, {});

  // Monthly trend (last 6 months)
  const monthlyData = {};
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  contacts.forEach((contact) => {
    const contactDate = new Date(contact.createdAt);
    if (contactDate >= sixMonthsAgo) {
      const monthYear = contactDate.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
    }
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Contact statistics retrieved successfully",
    data: {
      totalContacts,
      contactsByDate: Object.entries(contactsByDate).map(([date, count]) => ({
        date,
        count,
      })),
      subjectsCount: Object.entries(subjectsCount).map(([subject, count]) => ({
        subject,
        count,
      })),
      monthlyTrend: Object.entries(monthlyData).map(([month, count]) => ({
        month,
        count,
      })),
      recentContacts: contacts.slice(0, 10), // Last 10 contacts
    },
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    throw new AppError("Contact id is required", status.BAD_REQUEST);
  }
  const findContact = await Contact.findById(req.params.id);

  if (!findContact) {
    throw new AppError("Contact not found", status.NOT_FOUND);
  }

  const deletedContact = await Contact.findByIdAndDelete(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Contact deleted successfully",
    data: deletedContact,
  });
});

export const contactController = {
  postContact,
  getAllContact,
  deleteContact,
  getContactStats,
};
