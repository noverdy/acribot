import { Client, GatewayIntentBits } from 'discord.js'
import deployCommands from './deploy-commands'
import env from '@/utils/env'
import commands from '@/commands'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.DirectMessages,
	],
})

client.once('ready', async () => {
	if (env.APP_ENV === 'development') {
		await deployCommands({ guildId: env.DISCORD_GUILD_ID })
	}
	console.log('Discord bot is ready! 🤖')
})

client.on('guildCreate', async (guild) => {
	await deployCommands({ guildId: guild.id })
})

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) {
		return
	}
	const { commandName } = interaction
	if (commands[commandName as keyof typeof commands]) {
		commands[commandName as keyof typeof commands].execute(interaction)
	}
})

client.login(env.DISCORD_TOKEN)
