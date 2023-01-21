import Phaser from 'phaser'
export default class Shop extends Phaser.GameObjects.Container{
    preload(){
        this.load.image('color','assets/Colorwheel.png')
    }
    private coins: number
    constructor(scene: Phaser.Scene) {
        super(scene)
        //X and Y coords
        //this.x=
        //this.y=

        this.coins = 0;
        //needs sizing and placement figured out
        //add different images/text the same way you would with create()
       
        this.add(this.scene.add.text(100,100, "example text", {fontSize: '28px'}))
        this.add(this.scene.add.image(100,150,'color'))

        //last lines here
        this.scene.add.existing(this);
    }
    
  
    earnCoin() {
        this.coins++;
    }

}