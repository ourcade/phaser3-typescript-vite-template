import Phaser from 'phaser'
import Shop from './components/Shop'
import Tutorial from './components/Tutorial'
import Questions from './components/Questions'
import DisplayArea from './components/DisplayArea'
import DragAndDrop from './components/DragAndDrop'


export default class GameScene extends Phaser.Scene {
	private background?: Phaser.GameObjects.Image;
  
  //Rachel
	private popup?: Phaser.GameObjects.Image;
	private contain?: Phaser.GameObjects.Container;
	private quiztext?: Phaser.GameObjects.Text;
  //Rachel End


	///Mycah's Properties - START ----------------------------------
	items: any;
	blueHat: any;
	pink: any;
	greenHat: any;
	yellow: any;
	stuff: Phaser.Physics.Arcade.Group | undefined;
	nene: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
	dragObj: any;
	pinkNene!: Phaser.GameObjects.GameObject;
	pinkNeneBlueHat!: Phaser.GameObjects.GameObject;
	pinkNeneGreenHat!: Phaser.GameObjects.GameObject;
	yellowNene!: Phaser.GameObjects.GameObject;
	yellowNeneBlueHat!: Phaser.GameObjects.GameObject;
	yellowNeneGreenHat!: Phaser.GameObjects.GameObject;
	neneBlueHat!: Phaser.GameObjects.GameObject;
	neneGreenHat!: Phaser.GameObjects.GameObject;
	///Mycah's Properties - END ---------------------------------- 

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

    constructor() {
		super('game-scene')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')
		this.load.image('bg', 'assets/background.png')
		this.load.image('popup', 'assets/popup.png')
		//this.load.image('logo', 'assets/sprites/phaser3-logo.png')
		//this.load.image('red', 'assets/particles/red.png')
        
        //this.load.image('background', 'assets/background-V0.png')


		//Mycah's Code for preload() - START ----------------------------------
		//These images can be replaced with better one's later
		this.load.image('blueHat', 'assets/blueHat.png')
		this.load.image('greenHat', 'assets/greenHat.png')
		this.load.image('nene', 'assets/nene.png')
		this.load.image('pink', 'assets/pink.png')
		this.load.image('pinkNene', 'assets/pinkNene.png')
		this.load.image('pinkNeneBlueHat', 'assets/pinkNeneBlueHat.png')
		this.load.image('pinkNeneGreenHat', 'assets/pinkNeneGreenHat.png')
		this.load.image('yellow', 'assets/yellow.png')
		this.load.image('yellowNene', 'assets/yellowNene.png')
		this.load.image('yellowNeneBlueHat', 'assets/yellowNeneBlueHat.png')
		this.load.image('yellowNeneGreenHat', 'assets/yellowNeneGreenHat.png')
		this.load.image('neneGreenHat', 'assets/neneGreenHat.png')
		this.load.image('neneBlueHat', 'assets/neneBlueHat.png')
		//Mycah's Code for preload() - END ----------------------------------

	}

	create() {
        this.background = this.add.image(450, 300,'bg')
        this.background.displayHeight = 600
        this.background.displayWidth = 900
        
        
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

// rachel
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
// rachel end
        

		//Mycah's Code for create() - START ----------------------------------
		this.nene = this.physics.add.image(750, 200,'nene').setInteractive();
		this.input.setDraggable(this.nene);

		this.blueHat = this.physics.add.image(400,100,'blueHat').setInteractive();
		this.input.setDraggable(this.blueHat);

		this.greenHat = this.physics.add.image(400, 200,'greenHat').setInteractive();
		this.input.setDraggable(this.greenHat);

		this.pink = this.physics.add.image(400, 400,'pink').setInteractive();
		this.input.setDraggable(this.pink);

		this.yellow = this.physics.add.image(400, 500,'yellow').setInteractive();
		this.input.setDraggable(this.yellow);


		this.items = ["blueHat", "greenHat", "pink", "yellow"]


		this.input.dragDistanceThreshold = 16;
    
		this.input.on('dragstart', function (_pointer: any, gameObject: { setTint: (arg0: number) => void; }) {
		  gameObject.setTint(0xff0000);
		});
	  
		this.input.on('drag', function (_pointer: any, gameObject: { x: any; y: any; }, dragX: any, dragY: any) {
		  gameObject.x = dragX;
		  gameObject.y = dragY;
		});
	
		this.input.on('dragend', function (_pointer: any, gameObject: { clearTint: () => void; }) {
		  gameObject.clearTint();
		});

		this.physics.add.overlap(this.nene, this.items, undefined);

		this.physics.add.collider(this.nene, this.pink, this.handlePinkNene, undefined, this)
		this.physics.add.collider(this.nene, this.yellow, this.handleYellowNene, undefined, this)
		this.physics.add.collider(this.nene, this.blueHat, this.handleNeneBlueHat, undefined, this)
		this.physics.add.collider(this.nene, this.greenHat, this.handleNeneGreenHat, undefined, this)

		//this.physics.add.collider(this.pinkNene, this.blueHat, this.handlePinkNeneBlueHat)
		//this.physics.add.collider(this.pinkNene, this.greenHat, this.handlePinkNeneGreenHat, undefined, this)
		//this.physics.add.collider(this.yellowNene, this.blueHat, this.handleYellowNeneBlueHat, undefined, this)
		//this.physics.add.collider(this.yellowNene, this.greenHat, this.handleYellowNeneGreenHat, undefined, this)
    
		//Mycah's Code for create() - END ----------------------------------


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

	//Mycah's Code for OTHER FUNCTIONS - START ----------------------------------
	private handlePinkNene(nene: Phaser.GameObjects.GameObject, pink: Phaser.GameObjects.GameObject){
		const myNene = nene as Phaser.Physics.Arcade.Image
		myNene.disableBody(true, true)

		const myPink = pink as Phaser.Physics.Arcade.Image
		myPink.disableBody(true, true)

		this.pinkNene = this.physics.add.image(750, 300,'pinkNene').setInteractive()
		this.input.setDraggable(this.pinkNene);
	}

	private handleYellowNene(nene: Phaser.GameObjects.GameObject, yellow: Phaser.GameObjects.GameObject){
		const myNene = nene as Phaser.Physics.Arcade.Image
		myNene.disableBody(true, true)

		const myYellow = yellow as Phaser.Physics.Arcade.Image
		myYellow.disableBody(true, true)

		this.yellowNene = this.physics.add.image(750, 300,'yellowNene').setInteractive();
		this.input.setDraggable(this.yellowNene);
	}

	private handleNeneBlueHat(nene: Phaser.GameObjects.GameObject, blueHat: Phaser.GameObjects.GameObject){
		const myNene = nene as Phaser.Physics.Arcade.Image
		myNene.disableBody(true, true)

		const myBlueHat = blueHat as Phaser.Physics.Arcade.Image
		myBlueHat.disableBody(true, true)

		this.neneBlueHat = this.physics.add.image(750, 300,'neneBlueHat').setInteractive();
		this.input.setDraggable(this.neneBlueHat);
	}

	private handleNeneGreenHat(nene: Phaser.GameObjects.GameObject, greenHat: Phaser.GameObjects.GameObject){
		const myNene = nene as Phaser.Physics.Arcade.Image
		myNene.disableBody(true, true)

		const myGreenHat = greenHat as Phaser.Physics.Arcade.Image
		myGreenHat.disableBody(true, true)

		this.neneGreenHat = this.physics.add.image(750, 300,'neneGreenHat').setInteractive();
		this.input.setDraggable(this.neneGreenHat);
	}

	/*
	private handlePinkNeneBlueHat(pinkNene: Phaser.GameObjects.GameObject, blueHat: Phaser.GameObjects.GameObject){
		const myPinkNene = pinkNene as Phaser.Physics.Arcade.Image
		myPinkNene.disableBody(true, true)

		const myBlueHat = blueHat as Phaser.Physics.Arcade.Image
		myBlueHat.disableBody(true, true)

		this.pinkNeneBlueHat = this.physics.add.image(750, 300,'pinkNeneBlueHat').setInteractive();
		this.input.setDraggable(this.pinkNeneBlueHat);
		//const myPinkNeneBlueHat = this.pinkNeneBlueHat as Phaser.Physics.Arcade.Image
		//myPinkNeneBlueHat.enableBody(true, 750, 300, true, true)
	}


	private handlePinkNeneGreenHat(pinkNene: Phaser.GameObjects.GameObject, greenHat: Phaser.GameObjects.GameObject){
		const myPinkNene = pinkNene as Phaser.Physics.Arcade.Image
		myPinkNene.disableBody(true, true)

		const myGreenHat = greenHat as Phaser.Physics.Arcade.Image
		myGreenHat.disableBody(true, true)

		this.pinkNeneGreenHat = this.physics.add.image(750, 300,'pinkNeneGreenHat').setInteractive();
		this.input.setDraggable(this.pinkNeneGreenHat);
	}

	private handleYellowNeneBlueHat(yellowNene: Phaser.GameObjects.GameObject, blueHat: Phaser.GameObjects.GameObject){
		const myYellowNene = yellowNene as Phaser.Physics.Arcade.Image
		myYellowNene.disableBody(true, true)

		const myBlueHat = blueHat as Phaser.Physics.Arcade.Image
		myBlueHat.disableBody(true, true)

		this.yellowNeneBlueHat = this.physics.add.image(750, 300,'yellowNeneBlueHat').setInteractive();
		this.input.setDraggable(this.yellowNeneBlueHat);
	}

	private handleYellowNeneGreenHat(yellowNene: Phaser.GameObjects.GameObject, greenHat: Phaser.GameObjects.GameObject){
		const myYellowNene = yellowNene as Phaser.Physics.Arcade.Image
		myYellowNene.disableBody(true, true)

		const myGreenHat = greenHat as Phaser.Physics.Arcade.Image
		myGreenHat.disableBody(true, true)

		this.yellowNeneGreenHat = this.physics.add.image(750, 300,'yellowNeneGreenHat').setInteractive();
		this.input.setDraggable(this.yellowNeneGreenHat);
	}
	*/

	//Mycah's Code for OTHER FUNCTIONS - END ----------------------------------


}
