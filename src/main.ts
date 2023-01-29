import Phaser from 'phaser'
import collectionScene from './CollectionScene'

import GameScene from './GameScene'
import titleScene from './titleScene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

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

	scene: [titleScene,GameScene,collectionScene],
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