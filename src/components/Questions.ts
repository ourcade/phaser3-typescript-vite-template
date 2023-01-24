import Phaser from 'phaser'

export default class Questions extends Phaser.GameObjects.Container{
    
    constructor(scene: Phaser.Scene) { //don't touch
        super(scene) //Don't touch
        //X and Y coords
        //this.x=
        //this.y=

        //set class variables
        //this.coins = 0;

        //needs sizing and placement figured out
        //add different images/text the same way you would with create()

        //e.g. this.add(this.scene.add.text(100,100, "example text", {fontSize: '28px'}))


        
        this.scene.add.existing(this); //Don't touch
    }

    //methods down here
    public earnCoin() {
        return 0
    }
}