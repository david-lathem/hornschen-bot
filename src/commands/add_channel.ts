import {
  ApplicationCommandOptionType,
  AttachmentBuilder,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { downloadVideo } from "../utils/downloader.js";
import { setClaimedByUser, upsertChannelConfig } from "../database/queries.js";

export default {
  name: "add_channel",
  description: "Add a channel with message and video",
  permissionRequired: PermissionFlagsBits.Administrator,
  options: [
    {
      name: "channel",
      type: 7,
      description: "Channel to add",
      required: true,
    },
    {
      name: "message",
      type: 3,
      description: "Message text",
      required: false,
    },
    {
      name: "video",
      type: ApplicationCommandOptionType.Attachment,
      description: "Video URL to download",
      required: false,
    },
  ],
  execute: async (interaction) => {
    await interaction.deferReply();

    const channel = interaction.options.getChannel(
      "channel",
      true,
    ) as TextChannel;
    const messageText = interaction.options.getString("message");
    const video = interaction.options.getAttachment("video");

    const { id: channelId } = channel;

    console.log(video);

    let ext = null;

    let filePath = null;

    if (video) {
      const result = await downloadVideo(
        video.url,
        channelId,
        video.contentType,
      );

      ext = result.ext;
      filePath = result.filePath;
    }

    upsertChannelConfig.run({
      channelId,
      messageText,
      videoExt: ext,
    });

    setClaimedByUser.run({ channelId, claimedByUserId: null });

    if (messageText) await channel.send(messageText);

    if (filePath)
      await channel.send({ files: [new AttachmentBuilder(filePath)] });

    await interaction.editReply(`Success!`);
  },
} satisfies extendedAPICommand;
