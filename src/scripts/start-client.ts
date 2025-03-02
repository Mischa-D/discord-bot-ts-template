import { GatewayIntentBits } from "discord-api-types/gateway/v10";
import { Client } from "discord.js";
import { handler } from "../utils/command-handler.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot online");
  console.log(`serving on ${client.guilds.cache.size} servers`);
});

client.on("ready", () => {
  handler(client);
});

client.login(process.env.TOKEN);
