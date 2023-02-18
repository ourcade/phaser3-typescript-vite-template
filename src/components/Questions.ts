import Phaser from "phaser";
import GameScene from "../GameScene";
import quizJson from "../components/quiz.json";
export default class Questions extends Phaser.GameObjects.Container {
  //Rachel
  private popupBG?: Phaser.GameObjects.Image;
  private container: Phaser.GameObjects.Container | undefined;
  private quiztext: Phaser.GameObjects.Text | undefined;
  private choices1?: Phaser.GameObjects.Text;
  private choices2?: Phaser.GameObjects.Text;
  private choices3?: Phaser.GameObjects.Text;
  private choices4?: Phaser.GameObjects.Text;
  private index?: number;

  //Rachel End

  constructor(scene: GameScene) {
    //don't touch
    super(scene); //Don't touch
    this.scene.add.existing(this); //Don't touch
  }

  generatePopUp() {
    this.index = Math.floor(Math.random() * 20);
    this.popupBG = this.scene.physics.add.image(100, 50, "popup").setOrigin(0);
    this.quiztext = this.scene.add
      .text(150, 100, quizJson[this.index].question, {
        align: "center",
        wordWrap: { width: 500, useAdvancedWrap: true },
      })
      .setColor("#000000");
    this.choices1 = this.scene.add
      .text(150, 200, quizJson[this.index].choices[0], {
        align: "left",
        wordWrap: { width: 200, useAdvancedWrap: true },
      })
      .setColor("#000000")
      .setInteractive()
      .on("pointerover", () => this.choices1?.setColor("#fff000"))
      .on("pointerout", () => this.choices1?.setColor("#000000"))
      .on("pointerup", () => this.container?.destroy());
    this.choices2 = this.scene.add
      .text(500, 200, quizJson[this.index].choices[1], {
        align: "right",
        wordWrap: { width: 200, useAdvancedWrap: true },
      })
      .setColor("#000000")
      .setInteractive()
      .on("pointerover", () => this.choices2?.setColor("#fff000"))
      .on("pointerout", () => this.choices2?.setColor("#000000"))
      .on("pointerup", () => this.container?.destroy());
    if (quizJson[this.index].choices[0] == "True") {
      this.container = this.scene.add.container(32, 70, [
        this.popupBG,
        this.quiztext,
        this.choices1,
        this.choices2,
      ]);
      for (let i = 0; i < 2; i++) {
        if (
          quizJson[this.index].choices[i] == quizJson[this.index].expected &&
          i % 2 == 0
        ) {
          this.choices1.on(
            "pointerup",
            () => this.addCoins(),
            this.container?.destroy
          );
        } else {
          this.choices2.on(
            "pointerup",
            () => this.addCoins(),
            this.container?.destroy
          );
        }
      }
    } else {
      this.choices3 = this.scene.add
        .text(150, 350, quizJson[this.index].choices[2], {
          align: "left",
          wordWrap: { width: 200, useAdvancedWrap: true },
        })
        .setColor("#000000")
        .setInteractive()
        .on("pointerover", () => this.choices3?.setColor("#fff000"))
        .on("pointerout", () => this.choices3?.setColor("#000000"))
        .on("pointerup", () => this.container?.destroy());
      this.choices4 = this.scene.add
        .text(500, 350, quizJson[this.index].choices[3], {
          align: "right",
          wordWrap: { width: 200, useAdvancedWrap: true },
        })
        .setColor("#000000")
        .setInteractive()
        .on("pointerover", () => this.choices4?.setColor("#fff000"))
        .on("pointerout", () => this.choices4?.setColor("#000000"))
        .on("pointerup", () => this.container?.destroy());
      this.container = this.scene.add.container(32, 70, [
        this.popupBG,
        this.quiztext,
        this.choices1,
        this.choices2,
        this.choices3,
        this.choices4,
      ]);
      for (let i = 0; i < 4; i++) {
        if (quizJson[this.index].choices[i] == quizJson[this.index].expected) {
          if (i == 0) {
            this.choices1.on(
              "pointerup",
              () => this.addCoins(),
              this.container?.destroy
            );
          } else if (i == 1) {
            this.choices2.on(
              "pointerup",
              () => this.addCoins(),
              this.container?.destroy
            );
          } else if (i == 2) {
            this.choices3.on(
              "pointerup",
              () => this.addCoins(),
              this.container?.destroy
            );
          } else if (i == 3) {
            this.choices4.on(
              "pointerup",
              () => this.addCoins(),
              this.container?.destroy
            );
          }
        }
      }
    }
  }

  private addCoins() {
    (this.scene as GameScene).coins += 2;
    (this.scene as GameScene).shop?.scoreText.setText(
      `Coins: ${(this.scene as GameScene).coins}`
    );
  }
}
