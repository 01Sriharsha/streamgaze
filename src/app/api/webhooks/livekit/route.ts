import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/prisma";

const { LIVEKIT_API_SECRET, LIVEKIT_API_KEY } = process.env;

const webhookReciever = new WebhookReceiver(
  LIVEKIT_API_KEY!,
  LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const header = headers();
  const authorization = header.get("Authorization");

  if (!authorization) {
    return new Response("Unauthorized", { status: 401 });
  }

  const event = webhookReciever.receive(body, authorization);

  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }

  if (event.event === "ingress_started") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  return new Response("Success", { status: 200 });
}
