import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image('sky', 'assets/skies/space3.png')
	}

	create() {
		this.add.image(400, 300, 'sky')
	}
}
