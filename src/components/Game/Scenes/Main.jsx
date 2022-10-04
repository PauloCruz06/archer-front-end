import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import GameContext from '../../../contexts/GameContext';

import menuBack from "../../../assets/phaser/background/menu_background.jpg";
import headerBack from "../../../assets/phaser/background/page_header.png";
import footerBack from "../../../assets/phaser/background/page_footer.png";
import startTile from "../../../assets/phaser/tiles/startButton.png";
import rankingTile from "../../../assets/phaser/tiles/rankingButton.png";
import optionsTile from "../../../assets/phaser/tiles/optionsButton.png";
import { Div, SceneContainer } from './SceneConteinerStyle';

export default function Main() {
    const { gameInstance, score, setGameInstance, setScore } = useContext(GameContext);
    const navigate = useNavigate();

    class mainScene extends Phaser.Scene {
        constructor() {
            super('mainScene');
        }
    
        preload() {
            this.load.image('menu', menuBack);
            this.load.image('header', headerBack);
            this.load.image('footer', footerBack);
            this.load.spritesheet('start', startTile, {frameWidth: 121, frameHeight: 37});
            this.load.spritesheet('ranking', rankingTile, {frameWidth: 121, frameHeight: 37});
            this.load.spritesheet('options', optionsTile, {frameWidth: 121, frameHeight: 37});
        }
          
        create() {
            let currentScore = score;
            const backgroundImg = this.add.image(0, 180, 'menu');
            const headerImg = this.add.image(0, 0, 'header');
            const footerImg = this.add.image(0, 840, 'footer');
            let start = this.add.sprite(600, 500, 'start').setInteractive();
            let ranking = this.add.sprite(600, 581, 'ranking').setInteractive();
            let options = this.add.sprite(600, 662, 'options').setInteractive();
            let scoreText = this.add.text(
                10,
                10,
                `Score: ${currentScore}`,
                { fontSize: '16px Courier', fill: '#00ff00' }
            );

            backgroundImg.setOrigin(0, 0);
            headerImg.setOrigin(0,0);
            footerImg.setOrigin(0,0);
            backgroundImg.scale = 1.875;
            headerImg.scale = 1.875;
            footerImg.scale = 1.875;
            start.scale = 2;
            ranking.scale = 2;
            options.scale = 2;
          
            start.on('pointerover', () => {
                start.setTint(0x00ff00);
            });
            start.on('pointerout', () => {
                start.clearTint();
            });
            start.on('pointerdown', () => {
                startGame();
            });

            ranking.on('pointerover', () => {
                ranking.setTint(0x00ff00);
            });
            ranking.on('pointerout', () => {
                ranking.clearTint();
            });
            ranking.on('pointerdown', () => {
                goRanking(currentScore);
            });

            options.on('pointerover', () => {
                options.setTint(0x00ff00);
            });
            options.on('pointerout', () => {
                options.clearTint();
            });
            options.on('pointerdown', () => {
                updateScore(currentScore, scoreText);
            });
        }

        update() {

        }
    }
    
    function updateScore(currentScore, scoreText) {
        currentScore += 1;
        scoreText.setText('Score: ' + currentScore);
        setScore(currentScore);
    }

    function goRanking(currentScore) {
        setGameInstance([]);
        navigate('/ranking');
    }

    function startGame() {
        setGameInstance([]);
        navigate('/game');
    }

    function goHome() {
        navigate('/');
    }

    gameInstance.forEach(game => game?.destroy(true));
    
    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: 'mainScene-container',
            width: 1200,
            height: 900,
            scene: [mainScene]
        });

        setGameInstance([...gameInstance, game]);
    }, []);

    return (
        <Div>
            <SceneContainer id="mainScene-container"></SceneContainer>
            <button onClick={goHome}> Back </button>
        </Div>
    )
}
