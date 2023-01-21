import Phaser from 'phaser'
import Shop from './components/Shop'
import Tutorial from './components/Tutorial'
import Questions from './components/Questions'
import DisplayArea from './components/DisplayArea'
import DragAndDrop from './components/DragAndDrop'

export default class GameScene extends Phaser.Scene {
	private background?: Phaser.GameObjects.Image;
<<<<<<< HEAD
	private popup?: Phaser.GameObjects.Image;
	private contain?: Phaser.GameObjects.Container;
	private quiztext?: Phaser.GameObjects.Text;
=======

    // Holds coin management system
    // Populates left side of screen with different purchasables
    private shop?: Shop;

    // Pop up with game instructions
    // Not for MVP but probably some hints will go in here too
    private tutorial?: Tutorial;

    // Question pop ups
    // Also processes question data and displays
    private questions?: Questions;

    // Where the different objects are displayed / stacked
    private displayArea?: DisplayArea;

    // Drag and drop components 
    // The "machine" or whatever we're calling it
    // Where the attribute values go
    private dragAndDrop?: DragAndDrop;

>>>>>>> origin/main
    constructor() {
		super('hello-world')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')
		this.load.image('bg', 'assets/background.png')
		this.load.image('popup', 'assets/popup.png')
		//this.load.image('logo', 'assets/sprites/phaser3-logo.png')
		//this.load.image('red', 'assets/particles/red.png')
        
        //this.load.image('background', 'assets/background-V0.png')

        
	}

	create() {
        this.background = this.add.image(450, 300,'bg')
        this.background.displayHeight = 600
        this.background.displayWidth = 900

		this.popup = this.add.image(0, 0, 'popup').setOrigin(0);
		this.quiztext = this.add.text(120, 34, 'this is a test :)')
			.setColor('#000000')
			.setInteractive()
			.on('pointerover', () => this.quiztext?.setColor('#fff000'))
			.on('pointerout', () => this.quiztext?.setColor('#000000'))
			.on('pointerup', () => this.contain?.destroy());
		this.contain = this.add.container(32, 70, [ this.popup, this.quiztext ]);
		this.contain.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.popup.width, this.popup.height), Phaser.Geom.Rectangle.Contains);


		this.input.setDraggable(this.contain);
		this.contain.on('drag', function (pointer, dragX, dragY) {
			this.x = dragX;
			this.y = dragY;
		});
        
        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.shop = new Shop(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.displayArea = new DisplayArea(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.dragAndDrop = new DragAndDrop(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.questions = new Questions(this);

        // CREATES THE SHOP OBJECT & initializes values & SHOWS
        this.tutorial = new Tutorial(this);


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