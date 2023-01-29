import Phaser from "phaser";
import eventsCenter from "../EventsCenter";
import GameScene from "../GameScene"
//import Shop from "./Shop";

export default class DragAndDrop extends Phaser.GameObjects.Container {

  //COLORS V2 START --------------------------------------------
    private dragColors: Record<string, Phaser.GameObjects.GameObject>;
    private dragHats: Record<string, Phaser.GameObjects.GameObject>;
    private nene: Phaser.GameObjects.GameObject;
    private text: Phaser.GameObjects.Text;
    private currentAttributes: Record<string,string>;
    private hat?: Phaser.GameObjects.GameObject;
    private resetButton: Phaser.GameObjects.GameObject;
    private totalnene: number
    private totalnenetext: Phaser.GameObjects.Text;
  
  //COLORS V2 END ----------------------------------------------

  constructor(scene: GameScene) {

    super(scene); 

    this.text = this.scene.add.text(650,450, "nene = new Nene();", {"align":"left","color":"0x000000","fixedWidth":250});
    this.nene = this.scene.physics.add.image(750, 300, "nene").setInteractive();
    this.resetButton = this.scene.physics.add.image(750, 100, "reset").setInteractive();
    this.totalnene = 1;
    this.totalnenetext = this.scene.add.text(650,550, `Total Nenes Found: ${this.totalnene}`,{"color":"0x000000"})
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
    //const x_pos = Math.random() * 300 + 300;
    attributeNames.forEach((attribute) =>
        (dragItems[attribute] = this.scene.physics.add.image(350, y_pos, attribute).setInteractive(),
        this.scene.input.setDraggable(dragItems[attribute]),
        y_pos += 125)
    );
  }
  private displayValueOptions2(attributeNames: Array<string>, dragItems: Record<string, Phaser.GameObjects.GameObject>) {
    let y_pos = 100;
    //const x_pos = Math.random() * 300 + 300;
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
            this.scene.input.setDraggable(this.dragColors[color]);
        }
        const myColor = dragColor as Phaser.Physics.Arcade.Image;
        myColor.disableBody(true, true);
        const newColor = (dragColor as Phaser.GameObjects.Image).texture.key;
        this.nene = this.scene.physics.add.image(750, 300, "nene-" + newColor).setInteractive();
        this.currentAttributes["color"] = (dragColor as Phaser.GameObjects.Image).texture.key;
        this.text = this.text.setText("nene = new Nene(\n\t" + this.generateDisplayString() + "\n);");
        this.updateText();
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
            this.updateText();
            this.setUpCollisions();
            
          }
      
      private updateText() {
        const newText = this.generateDisplayString();
        this.text = this.text.setText("nene = new Nene(\n\t" + newText + "\n);");

        // Checks if nene is new for coins 
        if(!Object.keys((this.scene as GameScene).coinTracker).includes(newText)){
          (this.scene as GameScene).coinTracker[newText] = newText;
          (this.scene as GameScene).coins++;
          (this.scene as GameScene).shop?.scoreText.setText(`Coins: ${(this.scene as GameScene).coins}`);
          eventsCenter.emit("update-nenes", (this.scene as GameScene).coinTracker);
          this.totalnene = this.totalnene +1;
          this.totalnenetext = this.totalnenetext.setText(`Total Nenes Found: ${this.totalnene}`)
          if (this.totalnene == 25) {
            this.scene.scene.stop().launch("End");
          }
          // TODO trigger question pop up
        }   

      }

      private generateCoords() {
        return [Math.random() * 300 + 250, Math.random() * 400 + 100];
      }

      public generateDisplayString() {
        const lines: Array<string> = [];
        Object.keys(this.currentAttributes).sort().forEach(
            (key) => lines.push( "\"" + this.currentAttributes[key] + "\",")
        );
        if (lines)
          return lines.join("\n\t");
        return "";
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
}
