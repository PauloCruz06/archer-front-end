import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from "phaser";
import GameContext from '../../../contexts/GameContext';

import jungleImg from  "../../../assets/phaser/background/jungle.jpg";
import starImg from "../../../assets/phaser/star.png";
import { Div, SceneContainer } from './SceneConteinerStyle';

export default function Ranking() {
    const { gameInstance, setGameInstance } = useContext(GameContext);
    const navigate = useNavigate();
    
    class rankingScene extends Phaser.Scene {
        constructor() {
            super('rankingScene');
        }
    
        preload() {
            this.load.image('jungle', jungleImg);
            this.load.spritesheet('star', starImg, {frameWidth: 24, frameHeight: 24});
        }
    
        create() {
            const backgroundImg = this.add.image(0, 0, 'jungle');
            const star = this.add.sprite(650, 150, 'star').setInteractive();
    
            backgroundImg.setOrigin(0, 0);
            backgroundImg.scale = 1.9;
    
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
            width: 1200,
            height: 900,
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