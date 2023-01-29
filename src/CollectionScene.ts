import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class collectionScene extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Image;
    collectionBG!: Phaser.GameObjects.Image;
    private nenesCollected: Array<string>;
    private colors: Array<string>;
    private hats: Array<string>;
    private names: Array<string>;

    constructor(){
        super({key: 'collectionScene'});
        this.nenesCollected = ["nene = new Nene();"];
        this.names = ["nene"];
        this.colors = ["red","green","blue","purple"];
        this.hats = ["sunhat", "beanie","bucket-hat", "visor"];
    }

    preload() {
        //Preloads the collection background image
        this.load.image("collectionBG", "assets/collectionBG.jpg");
        this.load.image("backButton", "assets/backButton.png");
    }

    create(){
        eventsCenter.on('update-names', this.updateNames, this);
        eventsCenter.on('update-nenes', this.updateNenes, this);
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
        this.add.text(375,20,"Collection",{ font: '36px Courier', color: '#000000', align: 'center'});
        
        //Displays the names of the nenes
        this.loadInNenes();
    }

    public updateNenes(currentNenes: Array<string>) {
        console.log(currentNenes);
        this.nenesCollected = currentNenes;
        this.loadInNenes();
    }

    public updateNames(currentNames: Array<string>) {
        console.log(currentNames);
        this.names = currentNames;
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
        let x = -10;
        let y = 150;
        console.log(this.nenesCollected);
        console.log(this.names);

        this.nenesCollected.forEach( (desc: string) => {
            console.log(desc);
            [x, y] = this.increment(x, y);
            let foundColor = false; 
            this.colors.forEach( (color) => {
                if (desc.includes(color)) {
                    foundColor = true;
                    this.add.image(x,y, "nene-" + color).setScale(0.75);
                }           
            });
            if (!foundColor) {
                this.add.image(x,y,"nene").setScale(0.75);
            }
            this.hats.forEach( (hat) => {
                if (desc.includes(hat)) {
                    foundColor = true;
                    this.add.image(x,y, "nene-"+hat).setScale(0.75);
                }           
            });
            const index = this.nenesCollected.indexOf(desc);
            this.add.text(x-50, y+100, this.names[index], { font: '16px Courier', color: '#000000' })
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
