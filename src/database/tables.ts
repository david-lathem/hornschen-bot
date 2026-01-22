import db from "./index.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS channelConfig (
    channelId TEXT NOT NULL PRIMARY KEY,
    messageText TEXT NOT NULL,
    videoExt TEXT NOT NULL,
    claimedByUserId TEXT

  );
`);
