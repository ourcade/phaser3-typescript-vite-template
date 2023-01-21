import Phaser from 'phaser'

import GameScene from './GameScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 900,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {},
		},
	},
	scene: [GameScene],
}

export default new Phaser.Game(config)
