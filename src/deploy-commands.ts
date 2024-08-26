import { REST, Routes } from 'discord.js'
import commands from '@/commands'
import env from '@/utils/env'

const commandsData = Object.values(commands).map((command) => command.data)

const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN)

type DeployCommandsProps = {
	guildId: string
}

export default async function deployCommands({ guildId }: DeployCommandsProps) {
	try {
		console.log('Started refreshing application (/) commands.')

		await rest.put(
			Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, guildId),
			{
				body: commandsData,
			}
		)

		console.log('Successfully reloaded application (/) commands.')
	} catch (error) {
		console.error(error)
	}
}
