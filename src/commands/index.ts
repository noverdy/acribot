import ping from './ping'
import voice from './voice'

const commands = {
	ping,
	...voice,
}

export default commands
