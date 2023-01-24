import Phaser from 'phaser'

export default class Shop extends Phaser.GameObjects.Container{
    
    private coins: number
    private color: Phaser.GameObjects.Image
    private hats: Phaser.GameObjects.Image
    private scoreText?: Phaser.GameObjects.Text
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

        this.coins = 10;

        //needs sizing and placement figured out
        //add different images/text the same way you would with create()
        
        this.add(this.scene.add.text(40,240, "Additional Colors", {fontSize: '18px'}))
        this.add(this.scene.add.text(60,415, "Baseball Caps", {fontSize: '18px'}))
        this.add(this.scene.add.text(80,260, "5 Coins", {fontSize: '18px'}))
        this.add(this.scene.add.text(80,440, "3 Coins", {fontSize: '18px'}))
        this.scoreText = this.scene.add.text(20,550,'Coins: 10' , {fontSize: '32px'})
        this.color = this.scene.add.image(125,175,'color')
        this.color.setScale(0.25)
        this.hats = this.scene.add.image(125,350,'hats')
        this.hats.setScale(0.25)
        this.color.setInteractive()
        this.hats.setInteractive()
        this.color.on('pointerup',() =>{
            this.coins = this.coins-5;
            this.scoreText?.setText(`Coins: ${this.coins}`);
            this.color.removeInteractive()
            this.add(this.scene.add.text(80,175, "SOLD OUT!",  {fontSize: '18px'}))
        })
        this.hats.on('pointerup',() =>{
                this.coins = this.coins-3;
                this.scoreText?.setText(`Coins: ${this.coins}`);
                this.hats.removeInteractive()
                this.add(this.scene.add.text(85,340, "SOLD OUT!", {fontSize: '18px'}))
            })

        //last lines here
        this.scene.add.existing(this);
    }


    earnCoin() {
        console.log(this.coins);
    }

}