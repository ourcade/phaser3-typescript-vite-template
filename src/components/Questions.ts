import Phaser from 'phaser'
import GameScene from "../GameScene"
export default class Questions extends Phaser.GameObjects.Container {
    
    //Rachel
    private popupBG?: Phaser.GameObjects.Image;
    private container: Phaser.GameObjects.Container | undefined;
    private quiztext: Phaser.GameObjects.Text | undefined;
    private expected?: Phaser.GameObjects.Text;
    private choices?: Phaser.GameObjects.Text;

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
        const index = Math.floor(Math.random() * 20);
        this.popupBG = this.scene.physics.add.image(150,100, 'popup').setOrigin(0);
        this.quiztext = this.scene.add.text(200, 150, quizJson[index].question)
            .setColor('#000000');
        this.expected = this.scene.add.text(250, 275, quizJson[index].expected)
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.expected?.setColor('#fff000'))
			.on('pointerout', () => this.expected?.setColor('#000000'));
        this.choices = this.scene.add.text(400, 275, quizJson[index].choices[0])
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.choices?.setColor('#fff000'))
			.on('pointerout', () => this.choices?.setColor('#000000'));
		this.container = this.scene.add.container(32, 70, [ this.popupBG, this.quiztext, this.expected, this.choices ]);
        this.expected.on("pointerup", () => this.container?.destroy());
        this.choices.on("pointerup", () => this.choices?.setColor("#FF0000"))
    }

}