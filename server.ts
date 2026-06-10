import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route first: handling direct background email dispatch
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, company, email, type, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields: name, email, and message are required." 
      });
    }

    const emailSubject = `Corporate Inquiry - ${type || "General"}`;
    const emailText = `New inquiry received from ExportaMed website.
    
Name: ${name}
Company: ${company || "Not provided"}
Email: ${email}
Inquiry Type: ${type || "General"}

Message:
${message}
`;

    const brevoApiKey = process.env.BREVO_API_KEY;

    console.log("==================================================");
    console.log(`[EMAIL ACTION] Attempting to send email to office@exportamed.com via Brevo API`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Content:\n${emailText}`);
    console.log("==================================================");

    if (brevoApiKey) {
      const brevoPayload = {
        sender: { name: "ExportaMed Website", email: "office@exportamed.com" },
        to: [{ email: "office@exportamed.com", name: "ExportaMed Office" }],
        replyTo: { email, name },
        subject: emailSubject,
        textContent: emailText,
      };

      const renderResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify(brevoPayload),
      });

      if (!renderResponse.ok) {
        const errorData = await renderResponse.text();
        console.error("Brevo API Error:", errorData);
        return res.status(500).json({ 
          success: false, 
          error: "Failed to send email via Brevo." 
        });
      }

      return res.json({ 
        success: true, 
        message: "Email dispatched successfully via Brevo API." 
      });
    } else {
      console.warn("[WARNING] BREVO_API_KEY environment variable is missing! Logging email to console.");
      return res.json({ 
        success: true, 
        warning: "BREVO_API_KEY_MISSING",
        message: "Message received in server logs. Configure BREVO_API_KEY secret in settings to enable actual email delivery." 
      });
    }
  } catch (error: any) {
    console.error("[ERROR] Failed to send email:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Internal server error occurred." 
    });
  }
});

// Vite middleware development / production static setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
