import nodemailer from "nodemailer";

const sendNewsletterEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin notification
    await transporter.sendMail({
      from: `"Website Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Newsletter Subscriber",
      html: `<p>New subscriber: <b>${email}</b></p>`,
    });

    // Welcome email
    await transporter.sendMail({
      from: `"Limra Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to Our Newsletter",
      html: `
        <h3>Welcome!</h3>
        <p>Thank you for subscribing to our HVAC newsletter.</p>
        <p>You’ll receive updates, tips, and exclusive offers.</p>
        <br/>
        <p>— Limra Services Team</p>
      `,
    });

    console.log("📧 Newsletter emails sent");
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

export default sendNewsletterEmail;