import { getBannerMessage } from "@/app/lib/state";

export async function GET() {
  return Response.json({ message: getBannerMessage() });
}
