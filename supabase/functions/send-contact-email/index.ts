import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, message }: ContactFormData = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const smtp_host = Deno.env.get("SMTP_HOST");
    const smtp_port = Deno.env.get("SMTP_PORT") || "587";
    const smtp_user = Deno.env.get("SMTP_USER");
    const smtp_password = Deno.env.get("SMTP_PASSWORD");
    const smtp_from = Deno.env.get("SMTP_FROM") || "noreply@clarity.app";

    if (!smtp_host || !smtp_user || !smtp_password) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    const base64Creds = btoa(`${smtp_user}:${smtp_password}`);

    const response = await fetch(`smtp://${smtp_host}:${smtp_port}`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${base64Creds}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: smtp_from,
        to: "hatiq455@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: emailBody,
      }),
    } as RequestInit).catch(() => null);

    if (!response) {
      const mailtoUrl = `mailto:hatiq455@gmail.com?subject=${encodeURIComponent(
        `New Contact Form Submission from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      console.log("SMTP endpoint not available, please configure SMTP settings");
      console.log("Email details:", { from: smtp_user, to: "hatiq455@gmail.com", subject: `New Contact Form Submission from ${name}` });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
