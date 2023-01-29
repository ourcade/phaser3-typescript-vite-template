import Phaser from 'phaser'
import collectionScene from './CollectionScene'

import GameScene from './GameScene'
import titleScene from './titleScene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import End from './End'

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

<<<<<<< HEAD
	scene: [titleScene,GameScene,collectionScene],
=======
	scene: [titleScene,collectionScene,GameScene,End],
>>>>>>> origin
	dom: {
        createContainer: true
    },
	plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
    }

}
const game =  new Phaser.Game(config)
export default game