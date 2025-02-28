import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface ICommand {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
}
