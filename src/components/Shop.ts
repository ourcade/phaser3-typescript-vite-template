import Phaser from 'phaser'

export default class Shop extends Phaser.GameObjects.Container{
    
    private coins: number

    /**** READ ME from Megan
     * So... the fix is to put the call to load the image
     * in the GameScene.ts preload function. 
     * 
     * That will then load up the image and set a global name
     * for it (in this case, color)
     * 
     * You can then freely reference it in any component
     * 
     * Since I had Canva open already, I made your transparent
     * actually transparent (it had the grid showing on it)
     */
    constructor(scene: Phaser.Scene) {
        super(scene)
        //X and Y coords
        //this.x=
        //this.y=

        this.coins = 0;

        //needs sizing and placement figured out
        //add different images/text the same way you would with create()

        this.add(this.scene.add.text(100,100, "example text", {fontSize: '28px'}))
        this.add(this.scene.add.image(100,100,'color'))


        //last lines here
        this.scene.add.existing(this);
    }


    earnCoin() {
        this.coins++;
    }

}