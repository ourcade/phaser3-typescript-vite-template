import Phaser from "phaser";
import Shop from "./components/Shop";
import Tutorial from "./components/Tutorial";
import Questions from "./components/Questions";
import DisplayArea from "./components/DisplayArea";
import DragAndDrop from "./components/DragAndDrop";

export default class GameScene extends Phaser.Scene {
  private background?: Phaser.GameObjects.Image;

  //Mycah
  private collectionButton!: Phaser.GameObjects.Image;
  private saveButton!: Phaser.GameObjects.Image;

  //private myObjects: Record<string, Phaser.GameObjects.GameObject>;

  //Rachel
  //private popup?: Phaser.GameObjects.Image;
  //private contain: Phaser.GameObjects.Container | undefined;
  //private quiztext?: Phaser.GameObjects.Text;
  //Rachel End

  ///Mycah's Properties - START ----------------------------------
  /*items: any;
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
  neneGreenHat!: Phaser.GameObjects.GameObject;*/
  ///Mycah's Properties - END ----------------------------------

  // Holds coin management system
  // Populates left side of screen with different purchasables
  //private shop?: Shop;

  // Pop up with game instructions
  // Not for MVP but probably some hints will go in here too
  //private tutorial?: Tutorial;

  // Question pop ups
  // Also processes question data and displays
  //private questions?: Questions;

  // Where the different objects are displayed / stacked
  //private displayArea?: DisplayArea;

  // Drag and drop components
  // The "machine" or whatever we're calling it
  // Where the attribute values go
  //private dragAndDrop?: DragAndDrop;

  colors: Array<string>;
  hats: Array<string>;

  //Mycah
  names: Array<string>;
  myNames: any;
  rexUI: any;
  

  constructor() {
    super("GameScene");
    this.colors = ["blue", "green", "purple", "red"];
    this.hats = ["beanie", "bucket-hat", "sunhat", "visor"];

    //Mycah
    this.names = [];
  }

  preload() {
    //this.load.setBaseURL('https://labs.phaser.io')
    this.load.image("bg", "assets/background.png");
    this.load.image("color", "assets/Colorwheel.png");
    this.load.image("hats", "assets/hats.jpeg");

    this.load.image("popup", "assets/popup.png");
    
    this.loadAttribute("colors", this.colors);
    this.loadAttribute("hats", this.hats);
    this.load.image("reset", "assets/reset.png");
    this.load.image("nene", "assets/nene.png");

    //Mycah
    //Preloads the collection button image
    this.load.image("collectionButton", "assets/collectionButton.gif");

    //Preloads the save button image
    this.load.image("saveButton", "assets/saveButton.png");


   }

  create() {
    this.background = this.add.image(450, 300, "bg");
    this.background.displayHeight = 600;
    this.background.displayWidth = 900;

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new Shop(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new DisplayArea(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new DragAndDrop(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new Questions(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new Tutorial(this);


    //Mycah
    //Displays the collection button
    //When the collection button is clicked, it goes to the Collection Scene 
    this.collectionButton=this.add.image(850, 70, "collectionButton")
    .setInteractive();
    this.collectionButton.on("pointerover",() =>{
      this.collectionButton.setAlpha(1);
    });
    this.collectionButton.on("pointerout", ()=>{
      this.collectionButton.setAlpha(0.7);
    });
    this.collectionButton.on('pointerdown', ()=>this.goToCollectionScene());


    //Prompts the User to name their nene
    this.add.text(600, 540, 'Type below to name your nene:', { font: '16px Courier', color: '#000000' })
    //Takes the user's text input
    let text = this.add.text(630, 560, 'Type Here', { font: '16px Courier', color: '#000000' })
	  text.setInteractive().on('pointerdown', () => {
		  this.rexUI.edit(text)
	  })
    let editor = this.rexUI.edit(text)
    
    //Displays the save button 
    //When the save button is clicked, it saves the name of the nene
    this.saveButton=this.add.image(750, 60, "saveButton")
    .setInteractive();
    this.saveButton.on("pointerover",() =>{
      this.saveButton.setAlpha(1);
    });
    this.saveButton.on("pointerout", ()=>{
      this.saveButton.setAlpha(0.9);
    });
    this.saveButton.on('pointerdown', ()=>this.saveMyObject(editor.text));

  
}
  saveMyObject(elem: string) {
    this.names.push(elem as string);
    //this.add.text(100, 100, "new name" + elem);
    console.log("the names: " + this.names);
  }


  private loadAttribute(attributeName: string, attributeValues: Array<string>) {
    attributeValues.forEach((value: string) =>
      (this.load.image("nene-" + value, "assets/nene-" + attributeName + "/" + value + ".png"),
       this.load.image(value, "assets/" + attributeName + "/" + value + ".png"))
    );
  }

  //Function that handles changing the scene to the Collection Scene
  private goToCollectionScene(){
    this.scene.stop('GameScene').launch('collectionScene');
  }



}

