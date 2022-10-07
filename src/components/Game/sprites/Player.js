export default class Player {
    constructor(sc, spawning) {
        this.sc = sc;
        this.sprite = sc.physics.add.sprite(spawning.x, spawning.y, 'skull');
        this.sprite.body.setSize(26, 36);
        this.sprite.setCollideWorldBounds(false);

        sc.anims.create({
            key: 'right',
            frames: sc.anims.generateFrameNumbers('skull', { start: 4, end: 7 }),
            frameRate: 20,
            repeat: 0
        });
    
        sc.anims.create({
            key: 'idle',
            frames: sc.anims.generateFrameNumbers('skull', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
    
        sc.anims.create({
            key: 'jumping',
            frames: sc.anims.generateFrameNumbers('skull', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 1
        });
    
        sc.anims.create({
            key: 'left',
            frames: sc.anims.generateFrameNumbers('skull', { start: 4, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        sc.anims.create({
            key: 'attack',
            frames: sc.anims.generateFrameNumbers('skull', { start: 8, end: 11 }),
            frameRate: 20,
            repeat: 0
        })
    }
}