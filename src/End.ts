import Phaser from 'phaser'

export default class End extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Image;
    collectionBG!: Phaser.GameObjects.Image;

    constructor(){
        super({key: 'End'});
    }

    preload() {
        //Preloads the collection background image
        this.load.image("collectionBG", "assets/collectionBG.jpg");
        this.load.image("Pink", "assets/pink.png");
    }

    create(){
        //Displays the yellow background for the Collection Scene
       

        //Displays the back button
        //When the back button is clicked, it returns to the Game Scene 
        this.collectionBG=this.add.image(450, 300, "collectionBG");  
        this.backButton=this.add.image(300, 530, "Pink").setInteractive();
        
        this.backButton.on("pointerover",() =>{
            this.backButton.setAlpha(1);
        });
        this.backButton.on("pointerout", ()=>{
            this.backButton.setAlpha(0.7);
        });
        this.backButton.on('pointerdown', ()=>this.goToTitleScene());
       this.add.text(300,300,"YOU WIN!",{fontSize: '64px',"color":"#0000000"})
    }

    //Function that handles changing the scene to the Game Scene
    private goToTitleScene(){
       // const array = ["CollectionScene","GameScene", "titleScene", "End"]
        //array.forEach(
          //  (scene) => {
            //    this.registry.destroy(scene)
        //this.events.off(scene)
        //this.scene.restart(scene)
          //  }
        //)
        //this.registry.destroy()
        //this.events.off("End")
        //this.scene.restart()
        this.scene.stop('End').launch('titleScene')
        
        
        
    }

}