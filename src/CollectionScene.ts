import Phaser from 'phaser'

export default class collectionScene extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Image;
    collectionBG!: Phaser.GameObjects.Image;

    constructor(){
        super({key: 'collectionScene'});
    }

    preload() {
        //Preloads the collection background image
        this.load.image("collectionBG", "assets/collectionBG.jpg");
        this.load.image("backButton", "assets/backButton.png");
    }

    create(){
        //Displays the yellow background for the Collection Scene
        this.collectionBG=this.add.image(450, 300, "collectionBG");  

        //Displays the back button
        //When the back button is clicked, it returns to the Game Scene 
        this.backButton=this.add.image(70, 530, "backButton")
        .setInteractive();

        this.backButton.on("pointerover",() =>{
            this.backButton.setAlpha(1);
        });
        this.backButton.on("pointerout", ()=>{
            this.backButton.setAlpha(0.7);
        });
        this.backButton.on('pointerdown', ()=>this.goToGameScene());
       

    }

    //Function that handles changing the scene to the Game Scene
    private goToGameScene(){
        //this.scene.start('GameScene');
        this.scene.stop('collectionScene').launch('GameScene');
    }

}
