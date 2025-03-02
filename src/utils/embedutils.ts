import { EmbedBuilder } from "discord.js";

export const createEmbedTemplate = async () => {
  const embed = new EmbedBuilder()
    .setColor("#3837b9")
    .setTimestamp()
    .setFooter({
      text: "by Lagopus#4584",
      iconURL: "https://i.imgur.com/mQ4hMwD.jpeg",
    });

  return embed;
};
