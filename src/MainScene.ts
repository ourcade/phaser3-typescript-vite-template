import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
	private button?: Phaser.GameObjects.Image;
	private win?: Phaser.GameObjects.Zone;
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image('sky', 'assets/skies/space3.png')
		this.load.image('')
	}

	create() {
		this.button = this.add.image(400, 300, 'sky')
			.setInteractive()
			.on('pointerup', () => {
				this.createWindow();
			});
		
		createWindow() {
			this.win = this.add.zone(450, 300, 400, 300).setInteractive().setOrigin(0);
			this.input.setDraggable(this.win);
			this.win.on('drag', function (pointer?, dragX, dragY?) {
				this.win.x = dragX;
				this.win.y = dragY;
			});

		}

	}
}
