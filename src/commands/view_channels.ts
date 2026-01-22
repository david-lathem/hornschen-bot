import { PermissionFlagsBits } from "discord.js";
import { getAllChannelConfigs } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "view_channels",
  description: "View all configured channels with a preview of their messages",
  permissionRequired: PermissionFlagsBits.Administrator,

  execute: async (interaction) => {
    await interaction.deferReply();

    const channels = getAllChannelConfigs.all({});

    if (!channels.length) throw new Error("No channels found in the database");

    const formatted = channels
      .map((c, i) => {
        const preview = c.messageText.split(" ").slice(0, 10).join(" ");
        return `\`${i + 1}.\` <#${c.channelId}> — ${preview}${c.messageText.split(" ").length > 10 ? "..." : ""}`;
      })
      .join("\n\n");

    await interaction.editReply(`Here are all setup channels:\n\n${formatted}`);
  },
} satisfies extendedAPICommand;
