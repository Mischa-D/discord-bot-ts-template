import { REST } from "discord.js";
import { Routes } from "discord-api-types/rest/v10";
import { getFiles } from "../utils/get-command-files.js";
import dotenv from "dotenv";
import { ICommand } from "../types/ICommand.js";
import { COMMANDS_FOLDER } from "../constants.js";
dotenv.config();

const commands: any[] = [];

getFiles(COMMANDS_FOLDER).forEach(async (file) => {
  const command: ICommand = await import(`${file}`);
  commands.push(command.data.toJSON());
});

if (!process.env.TOKEN) throw Error("Token env variable missing");
if (!process.env.CLIENT_ID) throw Error("Client ID missing");

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
