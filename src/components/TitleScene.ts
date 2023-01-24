import Phaser from 'phaser'

export default class titleScene extends Phaser.Scene {
    background!: Phaser.GameObjects.Image;
    startButton!: Phaser.GameObjects.Image;
    cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar!: Phaser.Input.Keyboard.Key;
    music!: Phaser.Sound.BaseSound;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    declare add: any;
    declare input: any;
    declare scale: any;
    

    constructor() {
        super({ key: 'titleScene' });
      }
      preload()
      {
        this.load.image('titleScreen','assets/background.png')
        this.load.image('titleStart','assets/pink.png')
      }
    
    create(){
        
        this.add.image(400,300,'titleScreen');
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        

        //load in music
        
        
       
    
        //create startButton
        this.startButton = this.add.image(400, this.scale.height / 2 + 300, 'titleStart');
        this.startButton.setInteractive();
        this.startButton.on("pointerover",() =>{
            this.startButton.setAlpha(1);
        });
        this.startButton.on("pointerout", ()=>{
            this.startButton.setAlpha(.5);
        });
        this.startButton.on("pointerup",()=>{
            
            this.scene.stop('titleScene').launch('GameScene');
        })
    }
   
        
    

    //prevents click crash
    mouseFix() {}
}