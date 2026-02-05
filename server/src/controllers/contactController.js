import { transporter } from "../config/mailer.js";
import { contactModel } from "../models/contactModel.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newQuery = await contactModel.create({
      name,
      email,
      message,
    });

    await transporter.sendMail({
      from: `"Reneson Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Contact Form Query",
      text: `
        New Contact Query

        Name: ${name}
        Email: ${email}

        Message:
        ${message}
        `,
      html: `
  <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:6px; padding:20px;">
      
      <h2 style="color:#111827; margin-bottom:10px;">
        New Contact Query
      </h2>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:15px 0;" />

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>

      <p style="margin-top:15px;"><strong>Message:</strong></p>
      <div style="background:#f3f4f6; padding:12px; border-radius:4px;">
        ${message}
      </div>

    </div>
  </div>
`,
    });

    res.status(201).json({success: true,message: "Message sent successfully",});
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
