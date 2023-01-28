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

        //Easy difficulty selection
        this.easyButton=this.add.image(200,470,'easyButton')
        this.easyButton.setVisible(false)
        this.easyButton.setAlpha(.7);
        this.easyButton.setInteractive();
        this.easyButton.on("pointerover",() =>{
            this.easyButton.setAlpha(1);
        });
        this.easyButton.on("pointerout", ()=>{
            this.easyButton.setAlpha(.7);
        });
        this.easyButton.on("pointerup",()=>{
            this.titleText?.setVisible(false)
            this.easyButton?.setVisible(false)
            this.scene.stop('titleScene').launch('GameScene');
        })
        
         //Hard difficulty selection
         this.hardButton=this.add.image(430,470,'hardButton')
         this.hardButton.setVisible(false)
         this.hardButton.setAlpha(.7);
         this.hardButton.setInteractive();
         this.hardButton.on("pointerover",() =>{
             this.hardButton.setAlpha(1);
         });
         this.hardButton.on("pointerout", ()=>{
             this.hardButton.setAlpha(.7);
         });
         this.hardButton.on("pointerup",()=>{
             this.titleText?.setVisible(false)
             this.hardButton?.setVisible(false)
             this.difficulty=true;
             this.scene.stop('titleScene').launch('GameScene');
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