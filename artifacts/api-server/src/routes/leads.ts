import { Router, type IRouter } from "express";
import {
  SubmitQuoteRequestBody,
  SubmitQuoteRequestResponse,
} from "@workspace/api-zod";
import {
  sendEmail,
  buildAdminEmail,
  buildUserEmail,
} from "../lib/zeptomail";

const router: IRouter = Router();

router.post("/quote-request", async (req, res): Promise<void> => {
  const parsed = SubmitQuoteRequestBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid quote request body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const q = parsed.data;
  const adminEmail = process.env["ADMIN_EMAIL"] ?? "info@jjplumbingpe.co.za";
  const adminName = process.env["ADMIN_NAME"] ?? "JJ Plumbing Admin";

  const admin = buildAdminEmail(q);
  const user = buildUserEmail(q);

  const [adminRes, userRes] = await Promise.all([
    sendEmail({
      to: { address: adminEmail, name: adminName },
      subject: admin.subject,
      htmlBody: admin.htmlBody,
      replyTo: { address: q.email, name: q.name },
    }),
    sendEmail({
      to: { address: q.email, name: q.name },
      subject: user.subject,
      htmlBody: user.htmlBody,
    }),
  ]);

  if (!adminRes.success) {
    req.log.error(
      {
        adminError: adminRes.error,
        userError: userRes.success ? null : userRes.error,
        to: adminEmail,
      },
      "Quote request: admin email failed — lead may be lost",
    );
    res.status(502).json({
      error:
        "We couldn&rsquo;t deliver your request right now. Please call or WhatsApp us so we don&rsquo;t miss your job.",
    });
    return;
  }

  if (!userRes.success) {
    req.log.warn(
      { error: userRes.error, to: q.email },
      "Quote request: user confirmation email failed (admin email succeeded)",
    );
  }

  req.log.info(
    { service: q.service, propertyType: q.propertyType },
    "Quote request submitted",
  );

  res.json(
    SubmitQuoteRequestResponse.parse({
      success: true,
      message:
        "Thanks — we&rsquo;ve received your request and will be in touch shortly.",
    }),
  );
});

// NOTE: The generic /send-mail endpoint defined in the OpenAPI spec is intentionally
// NOT exposed at runtime. An unauthenticated public mail relay would be abused for
// spam and would burn the sender domain&rsquo;s reputation. If a transactional email
// endpoint is needed in the future, gate it behind server-side auth, a recipient
// allowlist, and rate limiting before re-enabling.

export default router;
