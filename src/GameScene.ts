import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
	private background?: Phaser.GameObjects.Image;
    constructor() {
		super('hello-world')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')
		this.load.image('bg', 'assets/background.png')
		//this.load.image('logo', 'assets/sprites/phaser3-logo.png')
		//this.load.image('red', 'assets/particles/red.png')
        
        //this.load.image('background', 'assets/background-V0.png')
	}

	create() {
        this.background = this.add.image(450, 300,'bg')
        this.background.displayHeight = 600
        this.background.displayWidth = 900
        
		//const particles = this.add.particles('red')

		/*const emitter = particles.createEmitter({
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD',
		})

		const logo = this.physics.add.image(400, 100, 'logo')

		logo.setVelocity(100, 200)
		logo.setBounce(1, 1)
		logo.setCollideWorldBounds(true)

		emitter.startFollow(logo)*/
	}
}