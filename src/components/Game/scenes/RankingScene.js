import Phaser from "phaser";

import skyImg from  "../../../assets/phaser/sky.png";
import starImg from "../../../assets/phaser/star.png";

export default class RankingScene extends Phaser.Scene {
    constructor() {
        super('RankingScene');
    }

    preload() {
        this.load.image('sky', skyImg);
        this.load.spritesheet('star', starImg, {frameWidth: 24, frameWidth: 24});
    }

    create() {
        const backgroundImg = this.add.image(0, 0, 'sky');
        const star = this.add.sprite(650, 150, 'star').setInteractive();

        backgroundImg.setOrigin(0, 0);

        star.on('pointerdown', () => {
            this.scene.start('MainScene');
        });
    }
}