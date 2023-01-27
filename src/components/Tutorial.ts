import Phaser from 'phaser'

export default class Tutorial extends Phaser.GameObjects.Container{
    
    constructor(scene: Phaser.Scene) { 
        super(scene) 
        
        this.scene.add.existing(this); 
    }

    public earnCoin() {
        return 0
    }
}