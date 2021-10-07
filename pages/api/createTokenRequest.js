import Ably from "ably/promises";

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "vibey-client",
  });
  res.status(200).json(tokenRequestData);
}
