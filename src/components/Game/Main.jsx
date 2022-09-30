import { useContext, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import RankingScene from "./scenes/RankingScene";
import styled from 'styled-components';

export default function Main() {
    const { gameInstance, setGameInstance } = useContext(GameContext);

    gameInstance.forEach(game => game?.destroy(true));
    
    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width: 800,
            height: 600,
            scene: [MainScene, RankingScene]
        });

        setGameInstance([...gameInstance, game]);
    }, []);

    return (
        <Div>
            <SceneContainer id="phaser-container"></SceneContainer>
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