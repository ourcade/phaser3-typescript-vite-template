import Phaser from 'phaser'

export default class titleScene extends Phaser.Scene {
    background!: Phaser.GameObjects.Image;
    startButton!: Phaser.GameObjects.Image;
    cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar!: Phaser.Input.Keyboard.Key;
    music!: Phaser.Sound.BaseSound;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    titleText?: Phaser.GameObjects.Text
    declare add: any;
    declare input: any;
    declare scale: any;
    

    constructor() {
        super({ key: 'titleScene' });
      }
      preload()
      {
        this.load.image('titleScreen','assets/backGround.png')
        this.load.image('titleStart','assets/pink.png')
      }
    
    create(){
        
        this.add.image(400,300,'titleScreen');
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.titleText=this.add.text(260,100,'Build A Bird',{
			fontSize: '32px',
			fill: '#000'
		})

        

        //load in music
        
        
       
    
        //create startButton
        this.startButton = this.add.image(400, 500, 'titleStart');
        this.startButton.setInteractive();
        this.startButton.on("pointerover",() =>{
            this.startButton.setAlpha(1);
        });
        this.startButton.on("pointerout", ()=>{
            this.startButton.setAlpha(.5);
        });
        this.startButton.on("pointerup",()=>{
            this.titleText?.setVisible(false)
            this.scene.stop('titleScene').launch('GameScene');
        })
    }
}