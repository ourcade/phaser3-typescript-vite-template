import Phaser from "phaser";
import Shop from "./components/Shop";
import Tutorial from "./components/Tutorial";
import Questions from "./components/Questions";
import DisplayArea from "./components/DisplayArea";
import DragAndDrop from "./components/DragAndDrop";

export default class GameScene extends Phaser.Scene {
  private background?: Phaser.GameObjects.Image;

  private collectionButton!: Phaser.GameObjects.Image;

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

  constructor() {
    super("GameScene");
    this.colors = ["blue", "green", "purple", "red"];
    this.hats = ["beanie", "bucket-hat", "sunhat", "visor"];
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

    //Preloads the collection button image
    this.load.image("collectionButton", "assets/collectionButton.gif");
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
