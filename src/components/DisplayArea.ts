import Phaser from 'phaser'

export default class DisplayArea extends Phaser.GameObjects.Container{
    
    //private color?: string
    //private nene?: Phaser.GameObjects.GameObject;
    //variables here
    //e.g. private coins: number
    constructor(scene: Phaser.Scene) { //don't touch
        super(scene) //Don't touch
        //X and Y coords
        this.x= 750
        this.y= 300

        //set class variables
        //this.coins = 0;

        //needs sizing and placement figured out
        //add different images/text the same way you would with create()

        //e.g. this.add(this.scene.add.text(100,100, "example text", {fontSize: '28px'}))
        //this.nene = this.scene.add.image(750, 300, "nene")

        
        this.scene.add.existing(this); //Don't touch
    }

    //methods down here
    public earnCoin() {
        return 0
    }

}