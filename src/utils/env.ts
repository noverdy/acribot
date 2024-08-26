import dotenv from 'dotenv'
import z from 'zod'

const envSchema = z
	.object({
		APP_ENV: z.enum(['development', 'production', 'test']),
		DISCORD_TOKEN: z.string(),
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_GUILD_ID: z.string().optional(),
	})
	.refine(
		(data) => {
			return data.APP_ENV === 'development'
				? Boolean(data.DISCORD_GUILD_ID)
				: true
		},
		{
			message: 'DISCORD_GUILD_ID is required in development environment',
		}
	)

dotenv.config()
const env = envSchema.parse(process.env)

export default env
