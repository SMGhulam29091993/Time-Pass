const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const emailVerification = async (receiver_name, receiver_email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"Timepass" <${process.env.EMAIL_USER}>`,
            to: receiver_email,
            subject: "Verify Your Email To Move Forward",
            text: `Hello ${receiver_name}, kindly verify your email by using the OTP: ${otp}`,
            html: `<b>Hello ${receiver_name}, kindly verify your email by using the OTP: ${otp}</b>`,
        });
        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

// // Example usage
// emailVerification(receiver_name, receiver_email, otp).catch(console.error);

module.exports = emailVerification;
