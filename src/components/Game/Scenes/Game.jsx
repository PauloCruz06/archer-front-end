import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from 'phaser';
import GameContext from "../../../contexts/GameContext";

import Player from '../sprites/Player';
import mapAssets from "../../../assets/phaser/Arena/area02_tileset/tiles.png";
import mapMid from "../../../assets/phaser/Arena/map_mid.png";
import mapBot from "../../../assets/phaser/Arena/map_bot.png";
import background1 from "../../../assets/phaser/Arena/parallax/parallax0.jpg";
import background2 from "../../../assets/phaser/Arena/parallax/parallax1.png";
import mapJSON from "../../../assets/phaser/Arena/map.json";
import slimeImg from "../../../assets/phaser/Sprites/redSlime.png";
import { Div, SceneContainer } from "./SceneConteinerStyle";

export default function Game() {
    const { gameInstance, setGameInstance } = useContext(GameContext);
    const navigate = useNavigate();

    class loginScene extends Phaser.Scene {
        constructor() {
            super('loginScene');
        }
    
        preload() {
            const sceneWidth = this.sys.canvas.width;
            const loadingBar = this.add.graphics();
            const barWidth = sceneWidth * 0.8;
            const defaultHeight = this.sys.game.config.height;
    
            this.load.on('progress', (value) => {
                loadingBar.clear();
                
                loadingBar.fillStyle(0xffffff, 1);
                loadingBar.fillRect((sceneWidth - barWidth)/2, defaultHeight/2, barWidth * value, 20);
    
                loadingBar.lineStyle(0x00ff00, 1);
                loadingBar.strokeRect((sceneWidth - barWidth)/2, defaultHeight/2, barWidth, 20);
            });
    
            this.load.on('complete', () => {
                this.scene.start('gameScene');
            });

            this.load.image('assets', mapAssets);
            this.load.image('mid', mapMid);
            this.load.image('bot', mapBot);
            this.load.image('back1', background1);
            this.load.image('back2', background2);
            this.load.tilemapTiledJSON('map', mapJSON);
            this.load.spritesheet('slime', slimeImg, { frameWidth: 24, frameHeight: 24 });
        }
    }
    
    class gameScene extends Phaser.Scene {
        constructor() {
            super('gameScene');
        }

        create() {
            const map = this.make.tilemap({ key: 'map' });
            const tileset = map.addTilesetImage('tiles', 'assets');
            
            const jungle = this.add.image(0, 0, 'back1');
            const fog = this.add.image(0, 0, 'back2');
            const botmap = this.add.image(0, 0, 'bot');
            const midmap = this.add.image(0, 0, 'mid');
            const colider = map.createLayer("objectColider", tileset, 0, 0);

            const spawningSpot = map.findObject(
                'player',
                objects => objects.name === 'spawning spot'
            );

            jungle.scale = 1.875;
            fog.scale = 1.875;
            botmap.scale = 1.875;
            midmap.scale = 1.875;
            colider.scale = 1.875;
            jungle.setOrigin(0, 0);
            fog.setOrigin(0, 0);
            botmap.setOrigin(0, 0);
            midmap.setOrigin(0, 0);

            colider.setInteractive();
            colider.setCollisionByProperty({ "collider": true });
            
            this.player = new Player(this, spawningSpot);
            this.physics.add.collider(this.player.sprite, colider);

            this.keys = this.input.keyboard.createCursorKeys();

        }

        update() {
            const player = this.player.sprite;
            if (this.keys.left.isDown) {
                player.setVelocityX(-160);
                player.setFlip(true, false);
                player.anims.play('left', true);
            } else if (this.keys.right.isDown) {
                player.setVelocityX(160);
                player.setFlip(false, false)
                player.anims.play('right', true);
            } else {
                player.setVelocityX(0);
                if (player.body.velocity.y === 0) {
                    player.anims.play('random');
                }
            }

            if (this.keys.up.isDown && player.body.velocity.y === 0) {
                player.setVelocityY(-100);
                player.anims.play('jumping');
            }
        }
    }

    function goHome() {
        navigate('/');
    }

    gameInstance.forEach(game => game?.destroy(true));

    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: 'gameScene-container',
            width: 1200,
            height: 900,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 100
                    },
                    debug: true
                }
            },
            scene: [loginScene, gameScene]
        });

        setGameInstance([...gameInstance, game]);
    }, []);

    return(
        <Div>
            <SceneContainer id="gameScene-container"></SceneContainer>
            <button onClick={goHome}> Back </button>
        </Div>
    )
}