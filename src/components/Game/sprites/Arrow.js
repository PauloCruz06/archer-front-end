export default class Arrow {
    constructor(sc, spawning) {
        this.sc = sc;
        this.sprite = sc.physics.add.sprite(spawning.x, spawning.y, 'arrow');
        this.sprite.body.setSize(35, 35);
        this.sprite.setCollideWorldBounds(false);
    }
}