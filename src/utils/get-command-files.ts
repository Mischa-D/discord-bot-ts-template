import { readdirSync } from "fs";

export const getFiles = (dir: string) => {
  const commandFiles = readdirSync(dir, { withFileTypes: true });
  let commands: string[] = [];

  for (const file of commandFiles) {
    if (file.isDirectory()) {
      commands = [...commands, ...getFiles(`${dir}/${file.name}`)];
    } else if (file.name.endsWith(".ts")) {
      commands.push(`${dir}/${file.name}`);
    }
  }

  return commands;
};
