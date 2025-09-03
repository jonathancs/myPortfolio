import { setBannerMessage } from "@/app/lib/state";

const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const TELEGRAM_ALLOWED_USER_ID = process.env.TELEGRAM_ALLOWED_USER_ID; // opcional (string numérica)

export async function POST(req: Request) {
  // Segurança: valida secret do Telegram (setWebhook com secret_token)
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (!TELEGRAM_WEBHOOK_SECRET || secret !== TELEGRAM_WEBHOOK_SECRET) {
    return new Response("unauthorized", { status: 401 });
  }

  const update = await req.json(); // payload do Telegram
  const msg = update?.message;
  const text: string | undefined = msg?.text;
  const fromId: string | undefined = msg?.from?.id?.toString();

  // Opcional: restringe o autor do comando
  if (TELEGRAM_ALLOWED_USER_ID && fromId !== TELEGRAM_ALLOWED_USER_ID) {
    return new Response("forbidden", { status: 403 });
  }

  // Comando esperado: /msg <conteúdo>
  if (text?.startsWith("/msg")) {
    const next = text.replace(/^\/msg\s*/i, "").trim();
    if (next.length > 0) {
      setBannerMessage(next);
      return Response.json({ ok: true });
    }
  }

  return Response.json({ ok: true }); // ignora outros updates
}
