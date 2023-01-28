import Phaser from 'phaser'
import GameScene from "../GameScene"
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

    constructor(scene: GameScene) { //don't touch
        super(scene) //Don't touch
        this.scene.load.json('questions', 'src/components/quiz.json');
        this.scene.load.start();
        this.generatePopUp();
        this.scene.add.existing(this); //Don't touch
    }

    private generatePopUp(){
        let quizJson = this.scene.cache.json.get('questions');
        this.index = Math.floor(Math.random() * 20);
        this.popupBG = this.scene.physics.add.image(150,100, 'popup').setOrigin(0);
        this.quiztext = this.scene.add.text(200, 150, quizJson[this.index].question, { align: "center", wordWrap: { width: 400, useAdvancedWrap: true } })
            .setColor('#000000');
        this.choices1 = this.scene.add.text(200, 200, quizJson[this.index].choices[0], { align: "right", wordWrap: { width: 450, useAdvancedWrap: true } })
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.choices1?.setColor('#fff000'))
			.on('pointerout', () => this.choices1?.setColor('#000000'))
            .on('pointerup', () => this.container?.destroy());
        this.choices2 = this.scene.add.text(400, 200, quizJson[this.index].choices[1], { align: "right", wordWrap: { width: 400, useAdvancedWrap: true } })
            .setColor('#000000')
             .setInteractive()
			 .on('pointerover', () => this.choices2?.setColor('#fff000'))
			 .on('pointerout', () => this.choices2?.setColor('#000000'))
             .on('pointerup', () => this.container?.destroy());
        if (quizJson[this.index].choices[0] == 'True'){
            this.container = this.scene.add.container(32, 70, [ this.popupBG, this.quiztext, this.choices1, this.choices2 ]);
        } else {
            this.choices3 = this.scene.add.text(200, 300, quizJson[this.index].choices[2], { align: "right", wordWrap: { width: 400, useAdvancedWrap: true } })
                .setColor('#000000')
                .setInteractive()
                .on('pointerover', () => this.choices3?.setColor('#fff000'))
                .on('pointerout', () => this.choices3?.setColor('#000000'))
                .on('pointerup', () => this.container?.destroy());
            this.choices4 = this.scene.add.text(400, 300, quizJson[this.index].choices[3], { align: "right", wordWrap: { width: 400, useAdvancedWrap: true } })
                .setColor('#000000')
                .setInteractive()
			    .on('pointerover', () => this.choices4?.setColor('#fff000'))
			    .on('pointerout', () => this.choices4?.setColor('#000000'))
                .on('pointerup', () => this.container?.destroy());
            this.container = this.scene.add.container(32, 70, [ this.popupBG, this.quiztext, this.choices1, this.choices2, this.choices3, this.choices4 ]);
            for (let i = 0; i < 4; i++){
                if (quizJson[this.index].choices[i] == quizJson[this.index].expected){
                    continue;
                }
            }
        }
    }

}