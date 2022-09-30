import Phaser from "phaser";

import logoImg from "../../../assets/phaser/logo.png";
import starImg from "../../../assets/phaser/star.png";
import bombImg from "../../../assets/phaser/bomb.png";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.spritesheet('star', starImg, {frameWidth: 24, frameWidth: 24});
        this.load.spritesheet('bomb', bombImg, {frameWidth: 24, frameWidth: 24});
    }
      
    create() {
        let currentScore = 0;
        const logo = this.add.image(400, 150, 'logo');
        const star = this.add.sprite(650, 150, 'star').setInteractive();
        const bomb = this.add.sprite(650, 450, 'bomb').setInteractive();
        const scoreText = this.add.text(
            10,
            10,
            `score: ${currentScore}`,
            { fontSize: '16px Courier', fill: '#00ff00' }
        );
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });

        star.on('pointerdown', () => {
            this.scene.start('RankingScene');
        });

        bomb.on('pointerdown', () => {
            updateScore(currentScore, scoreText);
        });
    }
}

function updateScore(currentScore, scoreText) {
    currentScore += 1;
    scoreText.setText('Score: ' + currentScore);
}