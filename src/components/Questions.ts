import Phaser from 'phaser'
import GameScene from "../GameScene"
export default class Questions extends Phaser.GameObjects.Container {
    
    //Rachel
    private popup: Phaser.GameObjects.Image;
    private contain: Phaser.GameObjects.Container | undefined;
    private quiztext: Phaser.GameObjects.Text | undefined;
    private questions: Array<string>;
    private answerT: Phaser.GameObjects.Text;
    private answerF: Phaser.GameObjects.Text;
    //Rachel End

    constructor(scene: GameScene) { //don't touch
        super(scene) //Don't touch
        this.questions = ["Color is an example of an attribute.", "Hats are an example of a subclass.", "Our nene is an instance of a class."]; //odd questions are true, evens are false
        this.popup = this.scene.physics.add.image(150,100, 'popup').setOrigin(0);
        this.quiztext = this.scene.add.text(200, 150, "this is a test :)")
            .setColor('#000000');
        this.answerT = this.scene.add.text(250, 275, "true")
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.answerT?.setColor('#fff000'))
			.on('pointerout', () => this.answerT?.setColor('#000000'));
        this.answerF = this.scene.add.text(400, 275, "false")
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.answerF?.setColor('#fff000'))
			.on('pointerout', () => this.answerF?.setColor('#000000'));
		this.contain = this.scene.add.container(32, 70, [ this.popup, this.quiztext, this.answerT, this.answerF ]);
        this.quizPopUp();
        this.scene.add.existing(this); //Don't touch
    }

    private generateQuestion(){
        return Math.floor(Math.random() * 3);
    }

    private quizPopUp() {
        const index = this.generateQuestion() ;
        this.quiztext = this.quiztext?.setText(this.questions[index]);
        if (index % 2 == 0){
            this.answerT.on("pointerup", () => this.contain?.destroy());
            this.answerF.on("pointerup", () => this.answerF.setColor("#FF0000"))
        } else {
            this.answerF.on("pointerup", () => this.contain?.destroy());
            this.answerT.on("pointerup", () => this.answerT.setColor("#FF0000"))
        }
    }

}