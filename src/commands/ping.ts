import cmd from '@/utils/cmd'

export default cmd(
	'ping',
	'Melakukan pengetesan koneksi',
	async (interaction) => {
		return interaction.reply('No')
	}
)
