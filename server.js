const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

const path = require("path");
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit-review", async (req, res) => {
  const { email, suggestion, rating } = req.body;

  // Set up transporter (use your own SMTP or Gmail credentials)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "snehagupta.gccoist@gmail.com",
      pass: "wszz qceg ovmo hrst"  // Use an App Password if using Gmail
    }
  });

  try {
    // Send review to yourself
    await transporter.sendMail({
      from: email,
      to: "snehagupta.gccoist@gmail.com",
      subject: "New User Review",
      html: `<p><strong>Email:</strong> ${email}</p>
             <p><strong>Suggestion:</strong> ${suggestion}</p>
             <p><strong>Rating:</strong> ${rating} stars</p>`
    });

    // Send thank you email to user
    await transporter.sendMail({
      from: "snehagupta.gccoist@gmail.com",
      to: email,
      subject: "Thank You for Your Review!",
      html: `<p>Dear User,</p>
             <p>Thank you for your feedback and rating of ${rating} stars. We truly appreciate it!</p>
             <p>Best regards,<br>Stream Tech Notes</p>`
    });

    res.json({ message: "Review submitted successfully!!" });
    
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send emails." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
