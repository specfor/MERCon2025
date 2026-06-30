export async function verifyRecaptcha(token: string | null): Promise<boolean> {
  if (!token) return false;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY is not defined. Skipping reCAPTCHA validation.");
    return true; 
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    
    // v2 returns success: true on success.
    if (data.success) {
      return true;
    }
    
    console.warn("reCAPTCHA validation failed or score too low:", data);
    return false;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
