import Phaser from "phaser";
import Shop from "./components/Shop";
import Tutorial from "./components/Tutorial";
import Questions from "./components/Questions";
import DisplayArea from "./components/DisplayArea";
import DragAndDrop from "./components/DragAndDrop";
import eventsCenter from "./EventsCenter";

export default class GameScene extends Phaser.Scene {
  private background?: Phaser.GameObjects.Image;

  private collectionButton!: Phaser.GameObjects.Image;
  private saveButton!: Phaser.GameObjects.Image;

  //Rachel
  public coins: number;
  public totalnene: number;
  //private popup?: Phaser.GameObjects.Image;
  //private contain: Phaser.GameObjects.Container | undefined;
  //private quiztext?: Phaser.GameObjects.Text;

  public coinTracker: Array<string>;
  //Rachel End

  // Holds coin management system
  // Populates left side of screen with different purchasables
  public shop?: Shop;

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

  public names: Array<string>;
  rexUI: any;
  textObj: any;
  userText: Phaser.GameObjects.Text | undefined;

  constructor() {
    super("GameScene");
    this.colors = ["blue", "green", "purple", "red"];
    this.coins = 10;
    this.coinTracker = [];
    this.totalnene = 1;
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

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new DisplayArea(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new DragAndDrop(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new Questions(this);

    // CREATES THE SHOP OBJECT & initializes values & SHOWS
    new Tutorial(this);

    this.shop = new Shop(this);

    //Displays the collection button
    //When the collection button is clicked, it goes to the Collection Scene
    this.collectionButton = this.add
      .image(850, 70, "collectionButton")
      .setInteractive();
    this.collectionButton.on("pointerover", () => {
      this.collectionButton.setAlpha(1);
    });
    this.collectionButton.on("pointerout", () => {
      this.collectionButton.setAlpha(0.7);
    });
    this.collectionButton.on("pointerdown", () => this.goToCollectionScene());

    //Prompts the User to name their nene
    this.add.text(600, 540, "Type below to name your nene:", {
      font: "16px Courier",
      color: "#000000",
    });
    //Takes the user's text input
    this.userText = this.add.text(630, 560, "Type Here", {
      font: "16px Courier",
      color: "#000000",
    });
    this.userText.setInteractive().on("pointerdown", () => {
      this.rexUI.edit(this.userText);
    });
    const editor = this.rexUI.edit(this.userText);

    //Displays the save button
    //When the save button is clicked, it saves the name of the nene
    this.saveButton = this.add.image(750, 60, "saveButton").setInteractive();
    this.saveButton.on("pointerover", () => {
      this.saveButton.setAlpha(1);
    });
    this.saveButton.on("pointerout", () => {
      this.saveButton.setAlpha(0.9);
    });
    this.saveButton.on("pointerdown", () => this.saveMyObject(editor.text));
  }
  saveMyObject(elem: string) {
    this.names.push(elem as string);
    //this.add.text(100, 100, "new name " + elem);
    console.log("the names: " + this.names);
  }

  private loadAttribute(attributeName: string, attributeValues: Array<string>) {
    attributeValues.forEach(
      (value: string) => (
        this.load.image(
          "nene-" + value,
          "assets/nene-" + attributeName + "/" + value + ".png"
        ),
        this.load.image(value, "assets/" + attributeName + "/" + value + ".png")
      )
    );
  }

  //Function that handles changing the scene to the Collection Scene
  private goToCollectionScene() {
    this.scene.stop("GameScene").launch("collectionScene", this.names);
  }
  private goToEndScene() {
    this.scene.stop("GameScene").launch("End");
  }

  update() {
    if (this.totalnene == 25) {
      this.totalnene = 1;
      this.coins = 10;
      this.goToEndScene();
    }
  }
}
