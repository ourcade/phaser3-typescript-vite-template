import Phaser from 'phaser'
import GameScene from '../GameScene';

export default class Shop extends Phaser.GameObjects.Container{
    

    

    private color: Phaser.GameObjects.Image
    private hats: Phaser.GameObjects.Image
    public scoreText: Phaser.GameObjects.Text
    
    constructor(scene: Phaser.Scene) {
        super(scene)
        
        this.add(this.scene.add.text(40,240, "Additional Colors", {fontSize: '18px',"color":"#FFFFFF"}))
        this.add(this.scene.add.text(60,415, "Baseball Caps", {fontSize: '18px',"color":"#FFFFFF"}))
        this.add(this.scene.add.text(80,260, "5 Coins", {fontSize: '18px',"color":"#FFFFFF"}))
        this.add(this.scene.add.text(80,440, "3 Coins", {fontSize: '18px', "color":"#FFFFFF"}))
        this.scoreText = this.scene.add.text(20,550,`Coins: ${(this.scene as GameScene).coins}`, {fontSize: '32px',"color":"#FFFFFF"});
        this.color = this.scene.add.image(125,175,'color')
        this.color.setScale(0.25)
        this.hats = this.scene.add.image(125,350,'hats')
        this.hats.setScale(0.25)
        this.color.setInteractive()
        this.hats.setInteractive()
        this.color.on('pointerup',() =>{
            (this.scene as GameScene).coins = (this.scene as GameScene).coins-5;
            this.scoreText.setText(`Coins: ${(this.scene as GameScene).coins}`);
            this.color.removeInteractive()
            this.add(this.scene.add.text(65,175, "SOLD OUT!",  {fontSize: '24px',"color":"#FFFFFF"}))
        })
        this.hats.on('pointerup',() =>{
            (this.scene as GameScene).coins = (this.scene as GameScene).coins-3;
               this.scoreText.setText(`Coins: ${(this.scene as GameScene).coins}`);
                this.hats.removeInteractive()
                this.add(this.scene.add.text(65,340, "SOLD OUT!", {fontSize: '24px',"color":"#ff0303"}))
            })

        //last lines here
        this.scene.add.existing(this);
    }


    earnCoin() {
        console.log((this.scene as GameScene).coins);
    }

}