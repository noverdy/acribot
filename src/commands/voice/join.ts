import cmd from '@/utils/cmd'
import { joinVoiceChannel } from '@discordjs/voice'
import { GuildMember } from 'discord.js'

export default cmd('join', 'Data ke ruangan anda', async (interaction) => {
	if (!(interaction.member instanceof GuildMember)) {
		return
	}

	const voiceChannel = interaction.member.voice.channel
	if (!voiceChannel) {
		return interaction.reply('Lho anda dimana?')
	}

	try {
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		})

		await interaction.reply('Saya sedang menuju ke voice channel anda')
	} catch (error) {
		await interaction.reply('Maaf saya sedang mengantuk')
	}
})
