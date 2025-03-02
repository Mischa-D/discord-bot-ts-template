import {
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { WithGuildId } from "./WithGuildId.js";

export interface ICommand {
  data: SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (
    interaction: WithGuildId<ChatInputCommandInteraction<CacheType>>
  ) => Promise<void>;
  autocomplete?: (
    interaction: WithGuildId<AutocompleteInteraction<CacheType>>
  ) => Promise<void>;
}
