import Phaser from 'phaser'
import GameScene from '../GameScene';
import DragAndDrop from './DragAndDrop';

export default class Shop extends Phaser.GameObjects.Container{
    

    

    private color: Phaser.GameObjects.Image
    private hats: Phaser.GameObjects.Image
    public scoreText: Phaser.GameObjects.Text
    
    constructor(scene: Phaser.Scene) {
        super(scene)
        
        this.add(this.scene.add.text(40,240, "Additional Colors", {fontSize: '18px',"color":"#FFFFFF"}))
        this.add(this.scene.add.text(45,415, "Additional Hats", {fontSize: '18px',"color":"#FFFFFF"}))
        this.add(this.scene.add.text(80,260, "4 Coins", {fontSize: '18px',"color":"#FFFFFF"}))
        this.add(this.scene.add.text(80,440, "6 Coins", {fontSize: '18px', "color":"#FFFFFF"}))
        this.scoreText = this.scene.add.text(20,550,`Coins: ${(this.scene as GameScene).coins}`, {fontSize: '32px',"color":"#FFFFFF"});
        this.color = this.scene.add.image(125,175,'color')
        this.color.setScale(0.25)
        this.hats = this.scene.add.image(125,350,'hats')
        this.hats.setScale(0.25)
        this.color.setInteractive()
        this.hats.setInteractive()
        this.color.on('pointerup',() =>{
            if((this.scene as GameScene).coins>=4){
            (this.scene as GameScene).coins = (this.scene as GameScene).coins-4;
            this.scoreText.setText(`Coins: ${(this.scene as GameScene).coins}`);
            this.color.removeInteractive();

            (this.scene as GameScene).dragAndDrop?.dragColors["red"].setVisible(true);

            (this.scene as GameScene).dragAndDrop?.dragColors["purple"].setVisible(true);
            (this.scene as GameScene).dragAndDrop?.SetcolorsGot() 
            this.add(this.scene.add.text(65,175, "SOLD OUT!",  {fontSize: '24px',"color":"#FFFFFF"}))
    }})
        this.hats.on('pointerup',() =>{
            if((this.scene as GameScene).coins>=6){
            (this.scene as GameScene).coins = (this.scene as GameScene).coins-6;
               this.scoreText.setText(`Coins: ${(this.scene as GameScene).coins}`);
                this.hats.removeInteractive();
                (this.scene as GameScene).dragAndDrop?.dragHats["sunhat"].setVisible(true);
                (this.scene as GameScene).dragAndDrop?.dragHats["visor"].setVisible(true);
                (this.scene as GameScene).dragAndDrop?.SethatsGot() 
                this.add(this.scene.add.text(65,340, "SOLD OUT!", {fontSize: '24px',"color":"#ff0303"}))
    }})

        //last lines here
        this.scene.add.existing(this);
    }


    earnCoin() {
        console.log((this.scene as GameScene).coins);
    }

}