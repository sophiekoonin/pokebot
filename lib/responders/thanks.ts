import { WebClient } from "@slack/web-api";
import { MentionEvent } from "../slack";
import { Responder } from "./";
import { pickOne } from "../pokemon";

const THANK_YOUS = [
  "You're very welcome",
  "No problem",
  "No worries mate",
  "Any time",
];

export default {
  id: "thanks",
  triggerPhrase: "Thanks",
  respond: async (event: MentionEvent, client: WebClient) => {
    await client.chat.postMessage({
      channel: event.channel,
      text: `<@${event.user}> ${pickOne(THANK_YOUS)}`,
    });
  },
} as Responder;
