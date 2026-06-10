interface Env {
  BREVO_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, company, email, type, message } = body as any;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailSubject = `Corporate Inquiry - ${type || "General"}`;
    const textContent = `New inquiry received from ExportaMed website.
    
Name: ${name}
Company: ${company || "Not provided"}
Email: ${email}
Inquiry Type: ${type || "General"}

Message:
${message}`;

    if (!env.BREVO_API_KEY) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          warning: "BREVO_API_KEY_MISSING",
          message: "Function executed but email wasn't sent because the API key is missing." 
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const brevoPayload = {
      sender: { name: "ExportaMed Website", email: "office@exportamed.com" },
      to: [{ email: "office@exportamed.com", name: "ExportaMed Office" }],
      replyTo: { email, name },
      subject: emailSubject,
      textContent: textContent,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo error:", errorText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send email via Brevo API." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
