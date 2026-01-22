import { BaseInteraction, TextChannel, MessageFlags } from "discord.js";

import { handleInteractionError } from "../../utils/interaction.js";
import {
  getAllChannelConfigs,
  setClaimedByUser,
} from "../../database/queries.js";

export default async (interaction: BaseInteraction) => {
  try {
    if (!interaction.isButton()) return;

    if (!interaction.guild) return;

    if (interaction.customId !== "open_ticket") return;

    const configs = getAllChannelConfigs.all({});

    const config = configs.find((c) => !c.claimedByUserId);

    if (!config) throw new Error("No more keys available");

    const channel = interaction.guild.channels.cache.get(
      config.channelId,
    ) as TextChannel;

    if (!channel) throw new Error("Something went wrong, channel not found");

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    setClaimedByUser.run({
      channelId: config.channelId,
      claimedByUserId: interaction.user.id,
    });

    await channel.permissionOverwrites.edit(interaction.user.id, {
      ViewChannel: true,
      SendMessages: true,
    });

    await interaction.editReply({
      content: `Here: ${channel}`,
    });
  } catch (error) {
    if (error instanceof Error) handleInteractionError(interaction, error);
  }
};
