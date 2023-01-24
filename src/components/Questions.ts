import Phaser from 'phaser'
import GameScene from "../GameScene"
export default class Questions extends Phaser.GameObjects.Container{
    
    //Rachel
    private popup?: Phaser.GameObjects.Image;
    private contain: Phaser.GameObjects.Container | undefined;
    private quiztext: Phaser.GameObjects.Text | undefined;
    private questions: Array<string>;
    private answerT: Phaser.GameObjects.Text;
    private answerF: Phaser.GameObjects.Text;
    //Rachel End

    constructor(scene: GameScene) { //don't touch
        super(scene) //Don't touch
        this.questions = ["Nene color is an example of an attribute.", "Hats are an example of a subclass.", "Our nene is an instance of a class."];
        this.popup = this.scene.physics.add.image(0, 0, 'popup').setOrigin(0);
        this.quiztext = this.scene.add.text(30, 34, "this is a test :)")
            .setColor('#000000');
        this.answerT = this.scene.add.text(50, 100, "true")
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.answerT?.setColor('#fff000'))
			.on('pointerout', () => this.answerT?.setColor('#000000'));
        this.answerF = this.scene.add.text(300, 100, "false")
            .setColor('#000000')
            .setInteractive()
			.on('pointerover', () => this.answerF?.setColor('#fff000'))
			.on('pointerout', () => this.answerF?.setColor('#000000'));
		this.contain = this.scene.add.container(32, 70, [ this.popup, this.quiztext, this.answerT, this.answerF ]);
		this.contain.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.popup.width, this.popup.height), Phaser.Geom.Rectangle.Contains);
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

    //methods down here
    public earnCoin() {
        return 0
    }
}