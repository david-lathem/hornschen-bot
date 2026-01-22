import { PermissionFlagsBits } from "discord.js";
import { deleteChannelConfig, getChannelConfig } from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "remove_channel",
  description: "Remove a channel from the database",
  permissionRequired: PermissionFlagsBits.Administrator,

  options: [
    {
      name: "channel",
      type: 7,
      description: "Channel to remove",
      required: true,
    },
  ],
  execute: async (interaction) => {
    await interaction.deferReply();

    const channelId = interaction.options.getChannel("channel", true).id;

    const existing = getChannelConfig.get({ channelId });

    if (!existing) throw new Error("Channel not found in the database");

    deleteChannelConfig.run({ channelId });

    await interaction.editReply(`<#${channelId}> removed!`);
  },
} satisfies extendedAPICommand;
