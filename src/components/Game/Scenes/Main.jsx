import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import GameContext from '../../../contexts/GameContext';
import styled from 'styled-components';

import logoImg from "../../../assets/phaser/logo.png";
import starImg from "../../../assets/phaser/star.png";
import bombImg from "../../../assets/phaser/bomb.png";

export default function Main() {
    const { gameInstance, score, setGameInstance, setScore } = useContext(GameContext);
    const navigate = useNavigate();

    class mainScene extends Phaser.Scene {
        constructor() {
            super('mainScene');
        }
    
        preload() {
            this.load.image('logo', logoImg);
            this.load.spritesheet('star', starImg, {frameWidth: 24, frameHeight: 24});
            this.load.spritesheet('bomb', bombImg, {frameWidth: 24, frameHeight: 24});
        }
          
        create() {
            let currentScore = score;
            const logo = this.add.image(400, 150, 'logo');
            const star = this.add.sprite(650, 150, 'star').setInteractive();
            const bomb = this.add.sprite(650, 450, 'bomb').setInteractive();
            let scoreText = this.add.text(
                10,
                10,
                `Score: ${currentScore}`,
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
            width: 800,
            height: 600,
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

const Div = styled.div`
    width: 100%;
    height: 100%;
    background-color: aquamarine;
`

const SceneContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #000000;
`