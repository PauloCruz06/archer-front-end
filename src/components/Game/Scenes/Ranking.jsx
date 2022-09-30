import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import GameContext from '../../../contexts/GameContext';
import styled from 'styled-components';

import skyImg from  "../../../assets/phaser/sky.png";
import starImg from "../../../assets/phaser/star.png";

export default function Ranking() {
    const { gameInstance, setGameInstance } = useContext(GameContext);
    const navigate = useNavigate();
    
    class rankingScene extends Phaser.Scene {
        constructor() {
            super('rankingScene');
        }
    
        preload() {
            this.load.image('sky', skyImg);
            this.load.spritesheet('star', starImg, {frameWidth: 24, frameHeight: 24});
        }
    
        create() {
            const backgroundImg = this.add.image(0, 0, 'sky');
            const star = this.add.sprite(650, 150, 'star').setInteractive();
    
            backgroundImg.setOrigin(0, 0);
    
            star.on('pointerdown', () => {
                goMenu();
            });
        }
    }

    function goMenu() {
        setGameInstance([]);
        navigate('/menu');
    }

    gameInstance.forEach(game => game?.destroy(true));

    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: 'rankingScene-container',
            width: 800,
            height: 600,
            scene: [rankingScene]
        });

        setGameInstance([...gameInstance, game]);
    }, []);

    return(
        <Div>
            <SceneContainer id="rankingScene-container"></SceneContainer>
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