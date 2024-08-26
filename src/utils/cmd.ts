import {
	CommandInteraction,
	InteractionResponse,
	SlashCommandBuilder,
} from 'discord.js'

export default function cmd(
	name: string,
	description: string,
	fn: (
		interaction: CommandInteraction
	) => Promise<InteractionResponse<boolean> | undefined>
) {
	return {
		data: new SlashCommandBuilder()
			.setName(name)
			.setDescription(description),
		execute: fn,
	}
}
