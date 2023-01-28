import Phaser from 'phaser'
import eventsCenter from './EventsCenter'

export default class collectionScene extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Image;
    collectionBG!: Phaser.GameObjects.Image;
    private nenesCollected: Array<string>;
    private colors: Array<string>;
    private hats: Array<string>;

    constructor(nenesCollected: Array<string>){
        super({key: 'collectionScene'});
        this.nenesCollected = nenesCollected;
        this.colors = ["red","green","blue","purple"];
        this.hats = ["sunhat", "beanie","bucket-hat", "visor"];
    }

    preload() {
        //Preloads the collection background image
        this.load.image("collectionBG", "assets/collectionBG.jpg");
        this.load.image("backButton", "assets/backButton.png");
    }

    create(names: Array<string>){
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
 
        //Displays the names of the nenes
        this.displayNames(names);
       
        eventsCenter.on('update-list', this.updateList, this);
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('update-list', this.updateList, this);
        })
    }

    //Function that displays the names of the nenes
    private displayNames(userNames: Array<string>) {
        for(let i = 0; i<userNames.length; i++){
            this.add.text(100, 50+i*50, userNames[i], { font: '16px Courier', color: '#000000' })
        }
    }

    //Function that handles changing the scene to the Game Scene
    private goToGameScene(){
        //this.scene.start('GameScene');
        this.scene.stop('collectionScene').launch('GameScene');
    }

    private updateList(list: Array<string>) {
        this.nenesCollected = list;
    }

    private loadInNenes() {
        let x = 200;
        let y = 300;

        this.nenesCollected.sort().forEach( (desc: string) => {
            [x, y] = this.increment(x, y);
            let foundColor = false; 
            this.colors.forEach( (color) => {
                if (desc.includes(color)) {
                    foundColor = true;
                    this.add.image(x,y, color).setScale(0.5);
                }           
            });
            if (!foundColor) {
                this.add.image(x,y,"assets/nene.png").setScale(0.5);
            }
            this.hats.forEach( (hat) => {
                if (desc.includes(hat)) {
                    foundColor = true;
                    this.add.image(x,y, hat).setScale(0.5);
                }           
            });
        }

        );

    }

    private increment(x: number, y:number) {
        x = x + 200;
        if (x > 700) {
            x = x-700;
            y = y+250;
        }
        return [x,y];
    }

}
