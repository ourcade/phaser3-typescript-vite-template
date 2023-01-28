import Phaser from 'phaser'
import collectionScene from './CollectionScene'
import End from './End'

import GameScene from './GameScene'
import titleScene from './titleScene'

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
	scene: [titleScene,GameScene,collectionScene,End],
}
const game =  new Phaser.Game(config)
export default game
