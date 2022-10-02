import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import GameContext from '../../../contexts/GameContext';

import starImg from "../../../assets/phaser/star.png";
import bombImg from "../../../assets/phaser/bomb.png";
import menuBack from "../../../assets/phaser/background/menu_background.jpg";
import headerBack from "../../../assets/phaser/background/page_header.png";
import footerBack from "../../../assets/phaser/background/page_footer.png";
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
            this.load.spritesheet('star', starImg, {frameWidth: 24, frameHeight: 24});
            this.load.spritesheet('bomb', bombImg, {frameWidth: 24, frameHeight: 24});
        }
          
        create() {
            let currentScore = score;
            const backgroundImg = this.add.image(0, 180, 'menu');
            const headerImg = this.add.image(0, 0, 'header');
            const footerImg = this.add.image(0, 840, 'footer');
            const star = this.add.sprite(650, 150, 'star').setInteractive();
            const bomb = this.add.sprite(650, 450, 'bomb').setInteractive();
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
          
    
            star.on('pointerdown', () => {
                goRanking(currentScore);
            });
    
            bomb.on('pointerdown', () => {
                updateScore(currentScore, scoreText);
            });
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
