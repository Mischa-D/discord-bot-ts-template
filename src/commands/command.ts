import { SlashCommandBuilder } from 'discord.js';
import { createEmbedTemplate } from '../utils/embedutils.js';
import { ICommand } from '../types/ICommand.js';

const command: ICommand = {
	data: new SlashCommandBuilder()
		.setName('command_name_without_spaces')
		.setDescription('any description you want')
		.addStringOption(option => option.setName('option1').setDescription('with description'))
		.addStringOption(option => option.setName('option2').setDescription('as many as you want...')),
	
	async execute(interaction) {
		// output
		const embed = createEmbedTemplate();
		embed.setTitle(`The title of the embed`);
		embed.setDescription('description of the embed');


		["foo", "bar"].forEach(name => {
			embed.addFields({ name, value: name.length.toString() });
		});
		embed.addFields({ name: "an empty field", value: '\u200B' });

		await interaction.reply({ embeds: [embed] });
	},
};

export default command;