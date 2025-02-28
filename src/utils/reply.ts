import { ChatInputCommandInteraction } from "discord.js";

export const replyEphemeral = async (
  interaction: ChatInputCommandInteraction,
  message: string
) => {
  interaction.reply({
    content: message,
    ephemeral: true,
  });
};
