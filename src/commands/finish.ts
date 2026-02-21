import { PermissionFlagsBits, TextChannel } from "discord.js";
import {
  deleteChannelConfig,
  getChannelConfig,
  setClaimedByUser,
} from "../database/queries.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "finish",
  description: "Finish a ticket: clears messages and unclaims it",
  permissionRequired: PermissionFlagsBits.Administrator,

  execute: async (interaction) => {
    if (!interaction.inCachedGuild()) return;

    await interaction.deferReply();

    const channel = interaction.channel as TextChannel;

    if (!channel) throw new Error("This command must be run in a text channel");

    const config = getChannelConfig.get({ channelId: channel.id });

    if (!config || !config.claimedByUserId)
      throw new Error(
        "This channel is not registered in the ticket system or no claimer found for the channel",
      );

    deleteChannelConfig.run({ channelId: channel.id });
    await channel.permissionOverwrites.edit(config.claimedByUserId, {
      ViewChannel: false,
      SendMessages: false,
    });


let fetchedMessages = await channel.messages.fetch({ limit: 100 });

while (fetchedMessages.size > 0) {
  for (const message of fetchedMessages.values()) {
    try {
      await message.delete();
    } catch (err) {
      console.log(`Failed to delete message ${message.id}`, err.message);
    }
  }

  fetchedMessages = await channel.messages.fetch({ limit: 100 });
}

    // await interaction.editReply(
    //   "Ticket finished: messages cleared and claim released.",
    // );
  },
} satisfies extendedAPICommand;
