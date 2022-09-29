import { useContext, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';
import Phaser from 'phaser';
import MainScene from './Scene/MainScene';
import styled from 'styled-components';

export default function Main() {
    const { gameInstance, setGameInstance } = useContext(GameContext);

    gameInstance.forEach(game => game?.destroy(true));
    
    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width: 1200,
            height: 900,
            scene: MainScene
        });

        setGameInstance([...gameInstance, game]);
    }, []);

    return (
        <Div id="phaser-container"></Div>
    )
}

const Div = styled.div`
    width: 100%;
    height: 100%;
    background-color: #000000;
`