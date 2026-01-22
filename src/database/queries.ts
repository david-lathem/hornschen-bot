import {
  ChannelConfig,
  ChannelConfigByChannelId,
} from "../utils/typings/database.js";
import db from "./index.js";

export const upsertChannelConfig = db.prepare<ChannelConfig>(`
  INSERT INTO channelConfig (
    channelId,
    messageText,
    videoExt
  )
  VALUES (
    @channelId,
    @messageText,
    @videoExt
  )
  ON CONFLICT(channelId) DO UPDATE SET
    messageText = excluded.messageText,
    videoExt    = excluded.videoExt
`);

export const setClaimedByUser = db.prepare<{
  channelId: string;
  claimedByUserId: string | null;
}>(`
  UPDATE channelConfig
  SET claimedByUserId = @claimedByUserId
  WHERE channelId = @channelId
`);

export const deleteChannelConfig = db.prepare<ChannelConfigByChannelId>(`
  DELETE FROM channelConfig
  WHERE channelId = @channelId
`);

export const getChannelConfig = db.prepare<
  ChannelConfigByChannelId,
  ChannelConfig
>(`
  SELECT *
  FROM channelConfig
  WHERE channelId = @channelId
`);

export const getAllChannelConfigs = db.prepare<{}, ChannelConfig>(`
  SELECT *
  FROM channelConfig
`);
