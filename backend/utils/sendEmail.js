import nodemailer from "nodemailer";

const sendEmail = async (contact) => {
  try {
    const { name, email, phone, service, message } = contact;

    // 📌 Create transporter
   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");


    // 📩 Admin Notification Email
    const adminMailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Form Submission",
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "No message provided"}</p>
      `,
    };

    // 📩 Auto-reply to user
    const userMailOptions = {
      from: `"Limra Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your request",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting <b>Limra Services</b>.</p>
        <p>Our team will contact you within 24 hours.</p>
        <br/>
        <p><b>Your Request Details:</b></p>
        <p>Service: ${service || "N/A"}</p>
        <p>Message: ${message || "N/A"}</p>
        <br/>
        <p>Regards,<br/>Limra Services Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("📧 Emails sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};

export default sendEmail;