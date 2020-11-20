import type { NextApiRequest, NextApiResponse } from "next";

import { installer } from "../../../util/installer";

export default function (req: NextApiRequest, res: NextApiResponse) {
  installer.handleCallback(req, res);
}
