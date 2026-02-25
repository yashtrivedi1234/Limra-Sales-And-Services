import nodemailer from "nodemailer";

 const getTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOrderEmail = async (order) => {

    const transporter = getTransporter();
    
  const mailOptions = {
    from: `"Your Store" <${process.env.EMAIL_USER}>`,
    to: order.customer.email,
    subject: "🛒 Order Confirmation",
    html: `
      <h2>Thank you for your order, ${order.customer.fullName}!</h2>
      <p>Your order has been placed successfully.</p>

      <h3>Order Details:</h3>
      <ul>
        <li><strong>Product:</strong> ${order.product.title}</li>
        <li><strong>Brand:</strong> ${order.product.brand}</li>
        <li><strong>Quantity:</strong> ${order.quantity}</li>
        <li><strong>Total Amount:</strong> ₹${order.amount}</li>
      </ul>

      <h3>Delivery Address:</h3>
      <p>
        ${order.customer.address}, ${order.customer.city}, 
        ${order.customer.state} - ${order.customer.pinCode}
      </p>

      <p>We will notify you when your order ships.</p>
      <br/>
      <p>Thanks,<br/>Your Store Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};