import Phaser from "phaser";
import GameScene from "../GameScene"

export default class DragAndDrop extends Phaser.GameObjects.Container {
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

  //COLORS V2 START --------------------------------------------
    private dragColors: Record<string, Phaser.GameObjects.GameObject>;
    private dragHats: Record<string, Phaser.GameObjects.GameObject>;
    private nene: Phaser.GameObjects.GameObject;
    private text: Phaser.GameObjects.Text;
    private currentAttributes: Record<string,string>;
    private hat?: Phaser.GameObjects.GameObject;
    private resetButton: Phaser.GameObjects.GameObject;
  
  //COLORS V2 END ----------------------------------------------
  //variables here
  //e.g. private coins: number
  constructor(scene: GameScene) {
    //don't touch
    super(scene); //Don't touch
    //X and Y coords
    //this.x=
    //this.y=

    //set class variables
    //this.coins = 0;

    //needs sizing and placement figured out
    //add different images/text the same way you would with create()
    //COLORS V2 START -------------------------------------------------------------
    //this.nene = this.scene.physics.add.image(750, 200, "nene").setInteractive();
    //this.scene.input.setDraggable(this.nene);
    this.text = this.scene.add.text(650,450, "nene = new Nene();", {"align":"left","color":"0x000000","fixedWidth":250});
    this.nene = this.scene.physics.add.image(750, 300, "nene").setInteractive();
    this.resetButton = this.scene.physics.add.image(750, 100, "reset").setInteractive();
    this.currentAttributes = {};
    this.dragColors = {};
    this.dragHats = {};
    this.displayValueOptions((this.scene as GameScene).colors, this.dragColors);
    this.displayValueOptions2((this.scene as GameScene).hats, this.dragHats);
    
    this.setUpButton();
    this.setUpDrag();
    this.setUpCollisions();
    //COLORS V2 END ---------------------------------------------------------------
  }

  private displayValueOptions(attributeNames: Array<string>, dragItems: Record<string, Phaser.GameObjects.GameObject>) {
    let y_pos = 100;
    const x_pos = Math.random() * 300 + 300;
    attributeNames.forEach((attribute) =>
        (dragItems[attribute] = this.scene.physics.add.image(350, y_pos, attribute).setInteractive(),
        this.scene.input.setDraggable(dragItems[attribute]),
        y_pos += 125)
    );
  }
  private displayValueOptions2(attributeNames: Array<string>, dragItems: Record<string, Phaser.GameObjects.GameObject>) {
    let y_pos = 100;
    const x_pos = Math.random() * 300 + 300;
    attributeNames.forEach((attribute) =>
        (dragItems[attribute] = this.scene.physics.add.image(500, y_pos, attribute).setInteractive(),
        this.scene.input.setDraggable(dragItems[attribute]),
        y_pos += 125)
    );
  }

  private setUpDrag () {
    this.scene.input.on(
        "dragstart",
        function (
          _pointer: any,
          gameObject: { setTint: (arg0: number) => void }
        ) {
          gameObject.setTint(0xE0E0E0);
        }
      );
  
      this.scene.input.on(
        "drag",
        function (
          _pointer: any,
          gameObject: { x: any; y: any },
          dragX: any,
          dragY: any
        ) {
          gameObject.x = dragX;
          gameObject.y = dragY;
        }
      );
  
      this.scene.input.on(
        "dragend",
        function (_pointer: any, gameObject: { clearTint: () => void }) {
          gameObject.clearTint();
        }
      );
  }

  private setUpCollisions() {
    this.scene.physics.add.overlap(this.nene, Object.values(this.dragColors), undefined);
    this.scene.physics.add.overlap(this.nene, Object.values(this.dragHats), undefined);

    Object.values(this.dragColors).forEach( (dragColor) => (
        this.scene.physics.add.collider(
            this.nene,
            dragColor,
            this.handleColorCollision,
            undefined,
            this
          )
    ));

    Object.values(this.dragHats).forEach( (dragHat) => (
        this.scene.physics.add.collider(
            this.nene,
            dragHat,
            this.handleHatCollision,
            undefined,
            this
          )
    ));
  }

private handleColorCollision(
    nene: Phaser.GameObjects.GameObject,
    dragColor: Phaser.GameObjects.GameObject) {
        const myNene = nene as Phaser.Physics.Arcade.Image;
        myNene.disableBody(true, true);
        if (Object.keys(this.currentAttributes).includes("color")) {
            const color = this.currentAttributes["color"];
            const coords = this.generateCoords() as Array<number>;
            this.dragColors[color] = this.scene.physics.add.image(coords[0], coords[1], color).setInteractive(),
            this.scene.input.setDraggable(this.dragColors[color])
        }
        const myColor = dragColor as Phaser.Physics.Arcade.Image;
        myColor.disableBody(true, true);
        const newColor = (dragColor as Phaser.GameObjects.Image).texture.key;
        this.nene = this.scene.physics.add.image(750, 300, "nene-" + newColor).setInteractive();
        this.currentAttributes["color"] = (dragColor as Phaser.GameObjects.Image).texture.key;
        this.text = this.text.setText("nene = new Nene(\n\t" + this.generateDisplayString() + "\n);");
        this.setUpCollisions();

      }

      private handleHatCollision(
        nene: Phaser.GameObjects.GameObject,
        dragHat: Phaser.GameObjects.GameObject) {
            console.log(nene);
            if (Object.keys(this.currentAttributes).includes("hat")) {
                const hat = this.currentAttributes["hat"];
                const coords = this.generateCoords() as Array<number>;
                (this.hat as Phaser.Physics.Arcade.Image).disableBody(true,true);
                this.dragHats[hat] = this.scene.physics.add.image(coords[0], coords[1], hat).setInteractive(),
                this.scene.input.setDraggable(this.dragHats[hat])
            }
            const myHat = dragHat as Phaser.Physics.Arcade.Image;
            myHat.disableBody(true, true);
            const newHat = (dragHat as Phaser.GameObjects.Image).texture.key;
            this.hat = this.scene.physics.add.image(750, 300, "nene-" + newHat).setInteractive();
            this.currentAttributes["hat"] = (dragHat as Phaser.GameObjects.Image).texture.key;
            this.text = this.text.setText("nene = new Nene(\n\t" + this.generateDisplayString() + "\n);");
            this.setUpCollisions();
    
          }

      private generateCoords() {
        return [Math.random() * 300 + 250, Math.random() * 400 + 100];
      }

      private generateDisplayString() {
        const lines: Array<string> = [];
        Object.keys(this.currentAttributes).forEach(
            (key) => lines.push( '"' + this.currentAttributes[key] + '",')
        );
        return lines.join("\n\t");
      }

      private setUpButton() {
        this.resetButton.setInteractive().on('pointerdown', (() => {
          this.text.destroy();
          this.text = this.scene.add.text(650,450, "nene = new Nene();", {"align":"left","color":"0x000000","fixedWidth":250});
          this.nene.destroy();
          this.hat?.destroy();
          this.nene = this.scene.physics.add.image(750, 300, "nene").setInteractive();
          this.currentAttributes = {};
          Object.values(this.dragColors).forEach((color) => color.destroy());
          Object.values(this.dragHats).forEach((hat) => hat.destroy());
          this.displayValueOptions((this.scene as GameScene).colors, this.dragColors);
          this.displayValueOptions2((this.scene as GameScene).hats, this.dragHats);
          this.setUpDrag();
          this.setUpCollisions();
  
        }));
      }
  
  //e.g. this.add(this.scene.add.text(100,100, "example text", {fontSize: '28px'}))
    /*
    //Mycah's Code for create() - START ----------------------------------
    this.nene = this.scene.physics.add.image(750, 200, "nene").setInteractive();
    this.scene.input.setDraggable(this.nene);

    this.blueHat = this.scene.physics.add.image(400, 100, "blueHat").setInteractive();
    this.scene.input.setDraggable(this.blueHat);

    this.greenHat = this.scene.physics.add
      .image(400, 200, "greenHat")
      .setInteractive();
    this.scene.input.setDraggable(this.greenHat);

    this.pink = this.scene.physics.add.image(400, 400, "pink").setInteractive();
    this.scene.input.setDraggable(this.pink);

    this.yellow = this.scene.physics.add.image(400, 500, "yellow").setInteractive();
    this.scene.input.setDraggable(this.yellow);

    this.items = ["blueHat", "greenHat", "pink", "yellow"];

    this.scene.input.dragDistanceThreshold = 16;

    this.scene.input.on(
      "dragstart",
      function (
        _pointer: any,
        gameObject: { setTint: (arg0: number) => void }
      ) {
        gameObject.setTint(0xff0000);
      }
    );

    this.scene.input.on(
      "drag",
      function (
        _pointer: any,
        gameObject: { x: any; y: any },
        dragX: any,
        dragY: any
      ) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );

    this.scene.input.on(
      "dragend",
      function (_pointer: any, gameObject: { clearTint: () => void }) {
        gameObject.clearTint();
      }
    );

    this.scene.physics.add.overlap(this.nene, this.items, undefined);

    this.scene.physics.add.collider(
      this.nene,
      this.pink,
      this.handlePinkNene,
      undefined,
      this
    );
    this.scene.physics.add.collider(
      this.nene,
      this.yellow,
      this.handleYellowNene,
      undefined,
      this
    );
    this.scene.physics.add.collider(
      this.nene,
      this.blueHat,
      this.handleNeneBlueHat,
      undefined,
      this
    );
    this.scene.physics.add.collider(
      this.nene,
      this.greenHat,
      this.handleNeneGreenHat,
      undefined,
      this
    );

    //this.physics.add.collider(this.pinkNene, this.blueHat, this.handlePinkNeneBlueHat)
    //this.physics.add.collider(this.pinkNene, this.greenHat, this.handlePinkNeneGreenHat, undefined, this)
    //this.physics.add.collider(this.yellowNene, this.blueHat, this.handleYellowNeneBlueHat, undefined, this)
    //this.physics.add.collider(this.yellowNene, this.greenHat, this.handleYellowNeneGreenHat, undefined, this)

    //Mycah's Code for create() - END ----------------------------------

    //Mycah Comment:
    //I will add to this later
    //Current Drag and Drop code is in the GameScene.ts

    this.scene.add.existing(this); //Don't touch
  }

  //methods down here
  //Mycah's Code for OTHER FUNCTIONS - START ----------------------------------
private handlePinkNene(
    nene: Phaser.GameObjects.GameObject,
    pink: Phaser.GameObjects.GameObject
  ) {
    const myNene = nene as Phaser.Physics.Arcade.Image;
    myNene.disableBody(true, true);

    const myPink = pink as Phaser.Physics.Arcade.Image;
    myPink.disableBody(true, true);

    this.pinkNene = this.scene.physics.add
      .image(750, 300, "pinkNene")
      .setInteractive();
    this.scene.input.setDraggable(this.pinkNene);
  }

  private handleYellowNene(
    nene: Phaser.GameObjects.GameObject,
    yellow: Phaser.GameObjects.GameObject
  ) {
    const myNene = nene as Phaser.Physics.Arcade.Image;
    myNene.disableBody(true, true);

    const myYellow = yellow as Phaser.Physics.Arcade.Image;
    myYellow.disableBody(true, true);

    this.yellowNene = this.scene.physics.add
      .image(750, 300, "yellowNene")
      .setInteractive();
    this.scene.input.setDraggable(this.yellowNene);
  }

  private handleNeneBlueHat(
    nene: Phaser.GameObjects.GameObject,
    blueHat: Phaser.GameObjects.GameObject
  ) {
    const myNene = nene as Phaser.Physics.Arcade.Image;
    myNene.disableBody(true, true);

    const myBlueHat = blueHat as Phaser.Physics.Arcade.Image;
    myBlueHat.disableBody(true, true);

    this.neneBlueHat = this.scene.physics.add
      .image(750, 300, "neneBlueHat")
      .setInteractive();
    this.scene.input.setDraggable(this.neneBlueHat);
  }

  private handleNeneGreenHat(
    nene: Phaser.GameObjects.GameObject,
    greenHat: Phaser.GameObjects.GameObject
  ) {
    const myNene = nene as Phaser.Physics.Arcade.Image;
    myNene.disableBody(true, true);

    const myGreenHat = greenHat as Phaser.Physics.Arcade.Image;
    myGreenHat.disableBody(true, true);

    this.neneGreenHat = this.scene.physics.add
      .image(750, 300, "neneGreenHat")
      .setInteractive();
    this.scene.input.setDraggable(this.neneGreenHat);
  }
*/
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
