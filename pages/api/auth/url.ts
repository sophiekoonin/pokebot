import type { NextApiRequest, NextApiResponse } from "next";

import { installer } from "../../../util/installer";

export default async function (_: NextApiRequest, res: NextApiResponse) {
  const result = await installer.generateInstallUrl({
    scopes: ["app_mentions:read", "chat:write"],
  });
  res.status(200).json({
    url: result,
  });
}