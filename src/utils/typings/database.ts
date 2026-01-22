export type ChannelConfig = {
  channelId: string;
  messageText: string;
  videoExt: string;
  claimedByUserId?: string | null;
};

export type ChannelConfigByChannelId = {
  channelId: string;
};
