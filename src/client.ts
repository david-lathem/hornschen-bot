import { Client, GatewayIntentBits } from "discord.js";

import registerEventsOnClient from "./utils/registrars/registerEvents.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = [];

await registerEventsOnClient(client);

client.login(process.env.TOKEN);

client.rest.on('rateLimited', (rateLimitInfo) => {
  console.log('Rate limit hit!');
console.log(rateLimitInfo)
});

export default client;
