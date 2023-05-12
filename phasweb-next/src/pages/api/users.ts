// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import io from "socket.io-client";

type Data = {
  count: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let count = 0;
  const socket = io("https://ws.rl-elo.com");

  socket.emit("getPlayersOnline");

  const countPromise = new Promise<number>((resolve) => {
    socket.on("getPlayersOnline", (count) => {
      resolve(count);
    });
  });

  count = await countPromise;
  socket.disconnect();

  return res.status(200).json({
    count,
  });
}
