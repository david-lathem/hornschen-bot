export type ChannelConfig = {
  channelId: string;
  messageText?: string | null;
  videoExt?: string | null;
  claimedByUserId?: string | null;
};

export type ChannelConfigByChannelId = {
  channelId: string;
};
