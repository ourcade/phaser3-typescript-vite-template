import Phaser from 'phaser'

export default class titleScene extends Phaser.Scene {
    startButton!: Phaser.GameObjects.Image;
    easyButton!:Phaser.GameObjects.Image;
    hardButton!:Phaser.GameObjects.Image;
    cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar!: Phaser.Input.Keyboard.Key;
    music!: Phaser.Sound.BaseSound;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    titleText?: Phaser.GameObjects.Text
    declare difficulty:any;
    declare add: any;
    declare input: any;
    declare scale: any;
    

    constructor() {
        super({ key: 'titleScene' });
      }
      preload()
      {
        this.load.image('titleScreen','assets/titleScene.jpg')
        this.load.image('titleStart','assets/startButton.png')
        this.load.image('easyButton','assets/easy.png')
        this.load.image('hardButton','assets/hard.png')

      }
    
    create(){
        this.difficulty=false;
        this.add.image(400,300,'titleScreen');
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.titleText=this.add.text(320,100,'Build A Bird',{
			fontSize: '32px',
			fill: '#000'
		})

        

        //load in music
        
        
       
    
        //create startButton
        this.startButton = this.add.image(430, 470, 'titleStart');
        this.startButton.setAlpha(.7);
        this.startButton.setInteractive();
        this.startButton.on("pointerover",() =>{
            this.startButton.setAlpha(1);
        });
        this.startButton.on("pointerout", ()=>{
            this.startButton.setAlpha(.7);
        });
        this.startButton.on("pointerup",()=>{
            
            this.startButton?.setVisible(false)
            this.easyButton?.setVisible(true)
            this.hardButton?.setVisible(true)
        })
    }
}