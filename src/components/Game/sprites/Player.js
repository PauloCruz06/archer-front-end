export default class Player {
    constructor(sc, spawning) {
        this.sc = sc;
        this.sprite = sc.physics.add.sprite(spawning.x, spawning.y, 'slime');
        this.sprite.body.setSize(24, 16);
        //this.sprite.setBounce(0.2)
        this.sprite.setCollideWorldBounds(true);

        sc.anims.create({
            key: 'right',
            frames: sc.anims.generateFrameNumbers('slime', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        sc.anims.create({
            key: 'random',
            frames: sc.anims.generateFrameNumbers('slime', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        sc.anims.create({
            key: 'jumping',
            frames: sc.anims.generateFrameNumbers('slime', { start: 0, end: 2 }),
            frameRate: 20,
            repeat: -1
        });
    
        sc.anims.create({
            key: 'left',
            frames: sc.anims.generateFrameNumbers('slime', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }
}