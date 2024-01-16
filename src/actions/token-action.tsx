"use server";

import { getSelf } from "@/services/auth-service";
import { isBlockedUser } from "@/services/block-service";
import { getUserById } from "@/services/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    //create a guest user if not logged in
    const id = v4();
    const username = `guest@${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  //get the actual streamer
  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("User not found");
  }

  //check if the viewer is blocked
  const isBlocked = await isBlockedUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  //check if the viewer is host himself
  const isHost = self.id == host.id;

  //generate a viewer token
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  if (!token) {
    throw new Error("Failed to generate token");
  }

  //grant permisssions
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
