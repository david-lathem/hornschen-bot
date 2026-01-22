import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  PermissionFlagsBits,
} from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";

export default {
  name: "send_embed",
  description: "Send an embed with a button to open a ticket",
  permissionRequired: PermissionFlagsBits.Administrator,

  execute: async (interaction) => {
    if (!interaction.channel || !interaction.channel.isSendable()) return;

    await interaction.reply({
      content: "Sending",
      flags: MessageFlags.Ephemeral,
    });

    const embed = new EmbedBuilder()
      .setTitle("Open a Ticket")
      .setDescription("Click the button below to open a support ticket.")
      .setColor(0x00ff00);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("open_ticket")
        .setLabel("Open")
        .setStyle(ButtonStyle.Primary),
    );

    await interaction.channel.send({ embeds: [embed], components: [row] });
  },
} satisfies extendedAPICommand;
