import { WebClient } from "@slack/web-api";
import { PrismaClient } from "@prisma/client";

import { MentionEvent } from "../slack";
import { Responder } from "./";
import { GEN_ONE_POKEMON, emojiFor, pickOne, Pokemon } from "../pokemon";

const statusFor = (pokemon: Pokemon): string => {
  const name = pokemon.name.english;
  return pickOne([
    `${name} is doing OK, thanks for checking in.`,
    `${name} is great – but a little hungry.`,
    `${name} is annoyed that you forgot their birthday last week.`,
    `${name} is good.`,
    `${name} is alright.`,
    `${name} is great.`,
    `${name} has been better, actually.`,
    `${name} has the sniffles.`,
    `${name} is doing well.`,
    `${name} is doing OK.`,
    `${name} is just fine.`,
    `${name} is having a rough day.`,
    `${name} would like a hug.`,
    `${name} could use.`,
    `Looks like ${name} is happy.`,
    `Your ${name} is looking healthy.`,
    `Your ${name} is well.`,
    `Your ${name} is just great.`,
    `Your ${name} is swell.`,
  ]);
};

export default {
  id: "query-stats",
  triggerPhrase: "How's my Pokémon?",
  respond: async (
    event: MentionEvent,
    client: WebClient,
    prisma: PrismaClient
  ) => {
    const rolls = await prisma.roll.findMany({
      where: { teamId: event.team, userId: event.user },
      orderBy: { createdAt: "desc" },
      take: 1,
    });

    if (rolls[0] == null) {
      await client.chat.postMessage({
        channel: event.channel,
        text: `<@${event.user}>: You don't have one!`,
      });
      return;
    }

    const roll = rolls[0];
    const pokemon = GEN_ONE_POKEMON[roll.pokemonNumber - 1];
    const emoji = emojiFor(pokemon);

    await client.chat.postMessage({
      channel: event.channel,
      text: `<@${event.user}>: :${emoji}: ${pokemon.name.english}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `It's ${pokemon.name.english}!`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: statusFor(pokemon),
          },
          fields: [
            {
              type: "mrkdwn",
              text: "*HP*",
            },
            {
              type: "plain_text",
              text: `${pokemon.base.HP}`,
            },
            {
              type: "mrkdwn",
              text: "*Attack*",
            },
            {
              type: "plain_text",
              text: `${pokemon.base.Attack}`,
            },
            {
              type: "mrkdwn",
              text: "*Defense*",
            },
            {
              type: "plain_text",
              text: `${pokemon.base.Defense}`,
            },
            {
              type: "mrkdwn",
              text: "*Speed*",
            },
            {
              type: "plain_text",
              text: `${pokemon.base.Speed}`,
            },
          ],
          accessory: {
            type: "image",
            image_url: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
            alt_text: pokemon.name.english,
          },
        },
      ],
    });
  },
} as Responder;
