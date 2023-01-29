import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class collectionScene extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Image;
    collectionBG!: Phaser.GameObjects.Image;
    private nenesCollected: Record<string,string>;
    private colors: Array<string>;
    private hats: Array<string>;
    private neneImages: Phaser.GameObjects.Group;
    private neneText: Phaser.GameObjects.Group;

    constructor(){
        super({key: 'collectionScene'});
        this.nenesCollected = {"":"vanilla nene"};
        this.colors = ["red","green","blue","purple"];
        this.hats = ["sunhat", "beanie","bucket-hat", "visor"];
        this.neneImages = new Phaser.GameObjects.Group(this);
        this.neneText = new Phaser.GameObjects.Group(this);
    }

    preload() {
        //Preloads the collection background image
        this.load.image("collectionBG", "assets/collectionBG.jpg");
        this.load.image("backButton", "assets/backButton.png");
    }

    create(){
        eventsCenter.on('update-nenes', this.updateNenes, this);
        //Displays the yellow background for the Collection Scene
        this.collectionBG=this.add.image(450, 300, "collectionBG");  
        this.collectionBG.ignoreDestroy = true;

        //Displays the back button
        //When the back button is clicked, it returns to the Game Scene 
        this.backButton=this.add.image(70, 530, "backButton")
        .setInteractive();
        this.backButton.ignoreDestroy = true;

        this.backButton.on("pointerover",() =>{
            this.backButton.setAlpha(1);
        });
        this.backButton.on("pointerout", ()=>{
            this.backButton.setAlpha(0.7);
        });
        this.backButton.on('pointerdown', ()=>this.goToGameScene());
        this.add.text(375,20,"Collection",{ font: '36px Courier', color: '#000000', align: 'center'});
        
        //Displays the names of the nenes
        this.loadInNenes();
    }

    public updateNenes(currentNenes: Record<string,string>) {
        console.log(currentNenes);
        this.nenesCollected = currentNenes;
        this.loadInNenes();
    }

    //Function that displays the names of the nenes
    /*private displayNames(userNames: Array<string>) {
        for(let i = 0; i<userNames.length; i++){
            
        }
    }*/

    //Function that handles changing the scene to the Game Scene
    private goToGameScene(){
        //this.scene.start('GameScene');
        this.scene.wake("GameScene");
    }

    private loadInNenes() {
        this.neneImages.clear(true);
        this.neneText.clear(true);
        let x = -10;
        let y = 150;
        console.log(this.nenesCollected);

        Object.keys(this.nenesCollected).sort().forEach( (desc: string) => {
            console.log(desc);
            [x, y] = this.increment(x, y);
            let foundColor = false; 
            this.colors.forEach( (color) => {
                if (desc.includes(color)) {
                    foundColor = true;
                    this.neneImages.add(this.add.image(x,y, "nene-" + color).setScale(0.75));
                    
                }           
            });
            if (!foundColor) {
                this.neneImages.add(this.add.image(x,y,"nene").setScale(0.75));
            }
            this.hats.forEach( (hat) => {
                if (desc.includes(hat)) {
                    foundColor = true;
                    this.neneImages.add(this.add.image(x,y, "nene-"+hat).setScale(0.75));
                }           
            });
            this.neneText.add(this.add.text(x-50, y+100, this.nenesCollected[desc], { font: '16px Courier', color: '#000000' }));
        }

        );

    }

    private increment(x: number, y:number) {
        x = x + 170;
        if (x > 700) {
            x = 160;
            y = y+250;
        }
        return [x,y];
    }

}
