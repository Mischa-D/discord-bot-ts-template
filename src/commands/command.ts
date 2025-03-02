import { SlashCommandBuilder } from "discord.js";
import { createEmbedTemplate } from "../utils/embedutils.js";
import { ICommand } from "../types/ICommand.js";
import { autocompleteInteractionCollection } from "../utils/command-handler.js";

const command: ICommand = {
  data: new SlashCommandBuilder()
    .setName("command_name_without_spaces")
    .setDescription("any description you want")
    .addStringOption((option) =>
      option
        .setName("option1")
        .setDescription("with description")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("option2").setDescription("as many as you want...")
    )
    .addUserOption((option) =>
      option
        .setName("DiscordUser")
        .setDescription("You can also make them choose a discord user")
    )
    .addStringOption((option) =>
      option
        .setName("choices")
        .setDescription("Or make them choose from a dynamically generated list")
        .setAutocomplete(true)
    ),
  async execute(interaction) {
    // setting (required) true will mean the value is guaranteed to be string
    const option1 = interaction.options.getString("option1", true);

    // otherwise it might be undefined instead. set accordingly to setRequired() in the slashcommandbuilder
    const discordUser = interaction.options.getUser("DiscordUser");

    // output
    const embed = await createEmbedTemplate();
    embed.setTitle(`The title of the embed`);
    embed.setDescription("description of the embed");

    ["foo", "bar"].forEach((name) => {
      embed.addFields({ name, value: name.length.toString() });
    });
    embed.addFields({ name: "an empty field", value: "\u200B" });
    embed.addFields({ name: "use option value", value: `${discordUser}` });

    // make sure to await here, or error handling might fail and crash the bot
    await interaction.reply({ embeds: [embed] });
  },
  // this is optional if your command does not use autocomplete
  async autocomplete(interaction) {
    const autoCompleteContext = interaction.options.getFocused(true);
    const userTypedThisValue = autoCompleteContext.value;
    const nameOfTheOption = autoCompleteContext.name;

    // dynamically generate choices
    // autocomplete choices are not enforced, for a static, enforced set of choices use .setChoices()
    const choices = searchAvailableValues(userTypedThisValue);

    // respond only to the latest sent interaction
    const latestInteraction = autocompleteInteractionCollection.get(
      interaction.guildId
    );
    if (!latestInteraction) return;

    // make sure to await here, or error handling might fail and crash the bot
    await latestInteraction.respond(
      choices.map((choice) => {
        return {
          name: choice,
          value: choice,
        };
      })
    );

    // delete interaction from storage to signal that it has been handled
    autocompleteInteractionCollection.set(interaction.guildId, null);
  },
};

// this could also be a function that queries a database / data file
const searchAvailableValues = (value: string) => {
  return ["Apple", "Banana", "Orange"].filter((fruit) => fruit.includes(value));
};

export default command;
