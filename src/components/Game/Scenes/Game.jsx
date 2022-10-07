import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Phaser from 'phaser';
import GameContext from "../../../contexts/GameContext";

import Player from '../sprites/Player';
import Arrow from '../sprites/Arrow';
import mapAssets from "../../../assets/phaser/Arena/area02_tileset/tiles.png";
import mapMid from "../../../assets/phaser/Arena/map_mid.png";
import mapBot from "../../../assets/phaser/Arena/map_bot.png";
import background1 from "../../../assets/phaser/Arena/parallax/parallax0.jpg";
import background2 from "../../../assets/phaser/Arena/parallax/parallax1.png";
import mapJSON from "../../../assets/phaser/Arena/map.json";
import slimeImg from "../../../assets/phaser/Sprites/redSlime.png";
import skullImg from "../../../assets/phaser/Sprites/skull_sprite.png";
import arrowImg from "../../../assets/phaser/Sprites/arrow.png";
import { Div, SceneContainer } from "./SceneConteinerStyle";

export default function Game() {
    const { gameInstance, setGameInstance } = useContext(GameContext);
    const navigate = useNavigate();
    
    const arrowList = [];
    let count = 0;

    class gameScene extends Phaser.Scene {
        constructor() {
            super('gameScene');
        }

        preload() {
            this.load.image('assets', mapAssets);
            this.load.image('mid', mapMid);
            this.load.image('bot', mapBot);
            this.load.image('back1', background1);
            this.load.image('back2', background2);
            this.load.image('arrow', arrowImg);
            this.load.tilemapTiledJSON('map', mapJSON);
            this.load.spritesheet('slime', slimeImg, { frameWidth: 24, frameHeight: 24 });
            this.load.spritesheet('skull', skullImg, { frameWidth: 64, frameHeight: 48 });
        }

        create() {
            
            const map = this.make.tilemap({ key: 'map' });
            const tileset = map.addTilesetImage('tiles', 'assets');
            
            const jungle = this.add.image(0, 0, 'back1');
            const fog = this.add.image(0, 0, 'back2');
            const botmap = this.add.image(0, 0, 'bot');
            const midmap = this.add.image(0, 0, 'mid');
            const colider = map.createLayer("objectColider", tileset, 0, 0);

            const arrows = this.physics.add.group({
                key: 'arrow',
                frameQuantity: 3,
                maxSize: 30,
                active: false,
                visible: false,
                enable: false,
                collideWorldBounds: false,
                bounceX: 0.4,
                bounceY: 0.4,
                dragX: 320,
                dragY: 0
            });

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

            colider.setCollisionByProperty({ "collider": true });

            this.arrows = arrows;
            this.arrowCollider = this.physics.add.collider(arrows, colider);

            this.player = new Player(this, spawningSpot);
            this.playerCollider = this.physics.add.collider(this.player.sprite, colider);
            this.player.sprite.scale = 1.6;
            
            this.keys = this.input.keyboard.createCursorKeys();
            this.attKey = this.input.keyboard.addKey('X');
            this.jumpKey = this.input.keyboard.addKey('UP');
            this.keyAttPress = false;
            this.arrowVelocity = { vx: 720, vy: -190 };
            this.vAux = this.arrowVelocity.vx;

            this.physics.add.overlap(this.player.sprite, arrows, collectArrow, null, this);
        }

        update() {
            const player = this.player.sprite;
            const arrow = this.arrows;

            if(this.keys.left.isDown) {
                player.setFlip(true, false);
                this.arrowVelocity.vx = -720;
                this.vAux = -720;
                
                if(this.attKey.isDown) {
                    player.setDragX(300);
                    this.keyAttPress = true;
                } else {
                    player.setVelocityX(-300);
                    player.anims.play('left', true);
                }
            } else if(this.keys.right.isDown) {
                player.setFlip(false, false)
                this.arrowVelocity.vx = 720;
                this.vAux = 720;

                if(this.attKey.isDown) {
                    player.setDragX(300);
                    this.keyAttPress = true;
                } else {
                    player.setVelocityX(300);
                    player.anims.play('right', true);
                }
            } else {
                player.setVelocityX(0);
            }

            if(this.jumpKey.isDown && player.body.onFloor() && !this.attKey.isDown) {
                player.setVelocityY(-390);
                player.anims.play('jumping');
            }
            
            if(this.attKey.isDown) {
                this.keyAttPress = true;
            }

            if(this.attKey.isUp) {
                if(this.keyAttPress) {
                    player.anims.play('attack', true);
                    this.keyAttPress = false;
                    if(this.jumpKey.isDown) {
                        this.arrowVelocity.vy = -700;
                        if(!this.keys.left.isDown && !this.keys.right.isDown) {
                            this.arrowVelocity.vy = -780
                            this.arrowVelocity.vx = 0;
                        }
                    } else if(this.keys.down.isDown) {
                        this.arrowVelocity.vy = 460;
                        if(!this.keys.left.isDown && !this.keys.right.isDown) {
                            this.arrowVelocity.vy = 520;
                            this.arrowVelocity.vx = 0;
                        }
                    } else {
                        this.arrowVelocity.vy = -190;
                        this.arrowVelocity.vx = this.vAux;
                    }
                    
                    if(count < 3) {
                        arrowList.push(createArrow(arrow, player.x, player.y, this.arrowVelocity.vx, this.arrowVelocity.vy));
                        count++
                    }
                }
            }

            player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                player.anims.play('idle');
            });

            if(player.body.velocity.y < 0) {
                this.playerCollider.active = false;
            } else {
                this.playerCollider.active = true;
            }

            if(player.x < 0) {
                player.x = 1200;
            } else if(player.x > 1200) {
                player.x = 0;
            }
            if(player.y < 0) {
                player.y = 900;
            } else if(player.y > 900) {
                player.y = 0;
            }

            arrowList.forEach(arr => {
                if(arr?.body.x < 0) {
                    arr.body.x = 1200;
                } else if(arr?.body.x > 1200) {
                    arr.body.x = 0;
                }
                if(arr?.body.y < 0) {
                    arr.body.y = 900;
                } else if(arr?.body.y > 900) {
                    arr.body.y = 0;
                }

                if(arr?.body.velocity.y < 0) {
                    arr.body.checkCollision.none = true;
                } else {
                    arr.body.checkCollision.none = false;
                }

                if(arr?.body.onFloor()) {
                    if(arr?.body.velocity.x < 0) {
                        arr.angle = -180.0
                    } else if(arr?.body.velocity.x > 0) {
                        arr.angle = 0.0
                    }
                } else {
                    if(arr?.body.velocity.y > 200) {
                        if(arr?.body.velocity.x < 0) {
                            arr.angle = 125.0
                        } else if(arr?.body.velocity.x > 0) {
                            arr.angle = 45.0
                        } else {
                            arr.angle = 90.0
                        }
                    } else if(arr?.body.velocity.y < 200) {
                        if(arr?.body.velocity.x < 0) {
                            arr.angle = -125.0
                        } else if(arr?.body.velocity.x > 0) {
                            arr.angle = -45.0
                        } else {
                            arr.angle = -90.0
                        }
                    } else {
                        if(arr?.body.velocity.x < 0) {
                            arr.angle = -180.0
                        } else if(arr?.body.velocity.x > 0) {
                            arr.angle = 0.0
                        }
                    }
                }
            })

        }
    }

    function createArrow(arrow, x, y, vx, vy) {
        const arr = arrow.get();
        
        if(!arr) return;

        arr
        .enableBody(true, x, y, true, true)
        .setVelocity(vx, vy);
        return arr;
    }

    function collectArrow(player, arrow) {
        if(arrow.body.onFloor()) {
            if(count >= 0) {
                if(arrowList.length > 3) {
                    arrowList.shift();
                }
                count--;
            }
            arrow.disableBody(true, true);
        }
    }

    function goHome() {
        setGameInstance([]);
        navigate('/menu');
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
                        y: 690
                    },
                    debug: true
                }
            },
            scene: [gameScene]
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