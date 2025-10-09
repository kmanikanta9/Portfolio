const contactModel = require("../models/contact.Model");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // use Gmail service
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSKEY,
  },
});

const addContact = async (req, res) => {
  try {
    let { email, firstName, lastName, subject, message } = req.body;

    // Trim and sanitize
    email = email?.trim();
    firstName = firstName?.trim();
    lastName = lastName?.trim();
    subject = subject?.trim();
    message = message?.trim();

    if (!email || !firstName || !lastName || !subject || !message) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const fullName = `${firstName} ${lastName}`;

    // Send email
    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: process.env.GOOGLE_USER, // send to your Gmail
      subject,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Save to MongoDB
    const contactDetails = await contactModel.create({
      email,
      firstName,
      lastName,
      subject,
      message,
    });

    res.status(200).json({ success: true, contactDetails });
  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addContact };
