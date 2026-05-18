import { logger } from "./logger";

const ZEPTO_ENDPOINT = "https://api.zeptomail.com/v1.1/email";

export interface ZeptoAddress {
  address: string;
  name?: string;
}

export interface SendEmailOptions {
  from?: ZeptoAddress;
  to: ZeptoAddress;
  subject: string;
  htmlBody: string;
  replyTo?: ZeptoAddress;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function getToken(): string {
  const raw = process.env["ZEPTOMAIL_TOKEN"];
  if (!raw) {
    throw new Error("ZEPTOMAIL_TOKEN is not configured");
  }
  return raw.startsWith("Zoho-enczapikey ") ? raw : `Zoho-enczapikey ${raw}`;
}

function defaultFrom(): ZeptoAddress {
  return {
    address: process.env["MAIL_FROM"] ?? "noreply@jjplumbingpe.co.za",
    name: process.env["MAIL_FROM_NAME"] ?? "JJ Plumbing Services",
  };
}

export async function sendEmail(opts: SendEmailOptions): Promise<SendEmailResult> {
  const from = opts.from ?? defaultFrom();
  const payload: Record<string, unknown> = {
    from: { address: from.address, name: from.name },
    to: [
      {
        email_address: {
          address: opts.to.address,
          name: opts.to.name ?? opts.to.address,
        },
      },
    ],
    subject: opts.subject,
    htmlbody: opts.htmlBody,
  };

  if (opts.replyTo) {
    payload["reply_to"] = [
      { address: opts.replyTo.address, name: opts.replyTo.name ?? opts.replyTo.address },
    ];
  }

  try {
    const res = await fetch(ZEPTO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: unknown = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!res.ok) {
      logger.error(
        { status: res.status, response: data, to: opts.to.address },
        "ZeptoMail send failed",
      );
      return {
        success: false,
        error: `ZeptoMail responded ${res.status}`,
      };
    }

    const dataObj = (data ?? {}) as Record<string, unknown>;
    const dataArr = Array.isArray(dataObj["data"])
      ? (dataObj["data"] as Array<Record<string, unknown>>)
      : [];
    const messageId =
      (dataArr[0]?.["additional_info"] as string | undefined) ??
      (dataObj["request_id"] as string | undefined);

    return { success: true, ...(messageId ? { messageId } : {}) };
  } catch (err) {
    logger.error({ err, to: opts.to.address }, "ZeptoMail request error");
    return { success: false, error: (err as Error).message };
  }
}

function esc(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SERVICE_LABELS: Record<string, string> = {
  "plumbing-installations": "Plumbing Installations",
  "plumbing-maintenance": "Plumbing Maintenance",
  "tree-felling": "Tree Felling",
  "site-clearing": "Site Clearing",
  "farm-clearing": "Farm Clearing",
  other: "Other",
};

const PROPERTY_LABELS: Record<string, string> = {
  home: "Home",
  business: "Business",
  farm: "Farm",
  site: "Site",
};

export function serviceLabel(key: string): string {
  return SERVICE_LABELS[key] ?? key;
}

export function propertyLabel(key: string): string {
  return PROPERTY_LABELS[key] ?? key;
}

export interface QuoteContext {
  name: string;
  phone: string;
  email: string;
  service: string;
  propertyType: string;
  message: string;
  location?: string | null;
}

export function buildAdminEmail(q: QuoteContext): { subject: string; htmlBody: string } {
  const subject = `New quote request: ${serviceLabel(q.service)} — ${q.name}`;
  const htmlBody = `
<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#F5F7FA;padding:24px;color:#1F2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
    <tr><td style="background:#1F5E3B;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700;">
      New Quote Request — JJ Plumbing Services
    </td></tr>
    <tr><td style="padding:24px;">
      <p style="margin:0 0 12px 0;">A new quote request was submitted on the website.</p>
      <table cellspacing="0" cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px;">
        <tr><td style="background:#F5F7FA;font-weight:600;width:140px;">Name</td><td>${esc(q.name)}</td></tr>
        <tr><td style="background:#F5F7FA;font-weight:600;">Phone</td><td>${esc(q.phone)}</td></tr>
        <tr><td style="background:#F5F7FA;font-weight:600;">Email</td><td>${esc(q.email)}</td></tr>
        <tr><td style="background:#F5F7FA;font-weight:600;">Service</td><td>${esc(serviceLabel(q.service))}</td></tr>
        <tr><td style="background:#F5F7FA;font-weight:600;">Property Type</td><td>${esc(propertyLabel(q.propertyType))}</td></tr>
        ${q.location ? `<tr><td style="background:#F5F7FA;font-weight:600;">Location</td><td>${esc(q.location)}</td></tr>` : ""}
        <tr><td style="background:#F5F7FA;font-weight:600;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${esc(q.message)}</td></tr>
      </table>
      <p style="margin:20px 0 0 0;font-size:13px;color:#6b7280;">Reply directly to this email to contact the customer.</p>
    </td></tr>
  </table>
</body></html>`;
  return { subject, htmlBody };
}

export function buildUserEmail(q: QuoteContext): { subject: string; htmlBody: string } {
  const subject = "We received your quote request — JJ Plumbing Services";
  const htmlBody = `
<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#F5F7FA;padding:24px;color:#1F2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
    <tr><td style="background:#1F5E3B;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700;">
      Thank you, ${esc(q.name)}
    </td></tr>
    <tr><td style="padding:24px;font-size:15px;line-height:1.55;">
      <p style="margin:0 0 14px 0;">We&rsquo;ve received your request for <strong>${esc(serviceLabel(q.service))}</strong> and a member of the JJ Plumbing Services and Tree Felling team will be in touch shortly to discuss your job and arrange a quote.</p>
      <p style="margin:0 0 14px 0;font-weight:600;">Your request summary</p>
      <table cellspacing="0" cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px;">
        <tr><td style="background:#F5F7FA;font-weight:600;width:140px;">Service</td><td>${esc(serviceLabel(q.service))}</td></tr>
        <tr><td style="background:#F5F7FA;font-weight:600;">Property type</td><td>${esc(propertyLabel(q.propertyType))}</td></tr>
        <tr><td style="background:#F5F7FA;font-weight:600;vertical-align:top;">Your message</td><td style="white-space:pre-wrap;">${esc(q.message)}</td></tr>
      </table>
      <p style="margin:20px 0 0 0;">If your job is urgent, please reply to this email or call us directly.</p>
      <p style="margin:24px 0 0 0;font-size:13px;color:#6b7280;">JJ Plumbing Services and Tree Felling<br/>Plumbing &middot; Tree Felling &middot; Site &amp; Farm Clearing</p>
    </td></tr>
  </table>
</body></html>`;
  return { subject, htmlBody };
}
