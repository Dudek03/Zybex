import Player from "./Player"
import Map from "./Map"
import { enemyData } from "./interfaces"
import Game from "./Game";
import Horde from "./Horde";
import { rectCollision } from "./utilities"

class Level {

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    lvNum: number
    player: Player
    map: Map
    speed: number
    isBossDead: boolean
    levelsInfo: { hordesArray: { pattern: (x: number) => number; speed: number; enemiesArray: enemyData[] }[]; boss: { pattern: (x: number) => number; speed: number; view: enemyData[] }; }[]
    currentLvlData: { hordesArray: { pattern: (x: number) => number; speed: number; enemiesArray: enemyData[]; }[]; boss: { pattern: (x: number) => number; speed: number; view: enemyData[]; }; };
    hordeID: number
    horde: Horde
    isBossFight: boolean;

    constructor(lvNum: number, speed: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null) {
        this.lvNum = lvNum
        this.player = new Player({ width: 50, height: 70 }, 3, { x: 10, y: 10 }, canvas, context)
        this.map = new Map(this.lvNum, { x: 0, y: 0 }, canvas, context)
        this.speed = speed
        this.canvas = canvas
        this.context = context
        this.isBossFight = false
        this.isBossDead = false
        this.levelsInfo = [
            {
                hordesArray: [
                    {
                        pattern: (x: number): number => { return Math.sin(x / 50) * 100 },
                        speed: 0.2,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 1, position: { x: this.canvas.width / 2 - 40, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 } }] }, isDropping: false },
                            { dimensions: { width: 40, height: 40 }, hp: 1, position: { x: this.canvas.width / 2 - 90, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false },
                            { dimensions: { width: 40, height: 40 }, hp: 1, position: { x: this.canvas.width / 2 - 140, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false }
                        ]
                    },
                    {
                        pattern: (x: number): number => { return Math.abs(Math.sin(x / 50)) * 100 },
                        speed: 0.2,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 1, position: { x: this.canvas.width / 2 - 40, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: false },
                            { dimensions: { width: 40, height: 40 }, hp: 1, position: { x: this.canvas.width / 2 - 90, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: false },
                            { dimensions: { width: 40, height: 40 }, hp: 1, position: { x: this.canvas.width / 2 - 140, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: false }
                        ]
                    },
                ],
                boss: {
                    pattern: (_x: number): number => { return 40 },
                    speed: 0.1,
                    view: [{ dimensions: { width: 40, height: 40 }, hp: 10, position: { x: this.canvas.width / 2 - 40, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false }]
                }
            }
        ]
        this.currentLvlData = this.levelsInfo[lvNum - 1]
        this.hordeID = 0
        this.horde = new Horde(this.currentLvlData.hordesArray[this.hordeID].pattern, this.currentLvlData.hordesArray[this.hordeID].enemiesArray, this.currentLvlData.hordesArray[this.hordeID].speed, this.canvas)
    }

    collision() {
        //collision between players projectiles and enemies
        this.player.activeProjectileArray.forEach(bullet => {
            this.horde.activeEnemy.forEach(ene => {
                if (rectCollision(bullet, ene)) {
                    bullet.hp--
                    ene.hp--
                }
            })
        })
        //collision between enemies and player
        this.horde.activeEnemy.forEach(ene => {
            if (rectCollision(this.player, ene)) {
                this.player.position.x = 0
                this.player.position.y = 0
                this.player.hp--
            }

        })
        //collision between enemies projectiles and player
        this.horde.activeEnemy.forEach(enemy => {
            enemy.activeProjectileArray.forEach(bullet => {
                if (rectCollision(this.player, bullet)) {
                    this.player.position.x = 0
                    this.player.position.y = 0
                    this.player.hp--
                    bullet.hp--
                }
            })
        })
    }

    render() {
        this.map.position.x -= this.speed * Game.deltaTime
        this.player.referencePoint -= this.speed * Game.deltaTime
        if (!this.horde.activeEnemy.length) {
            this.hordeID = this.hordeID + 1
            //console.log(this.currentLvlData.hordesArray[1], this.hordeID)
            if (this.currentLvlData.hordesArray[this.hordeID])
                this.horde.loadNewHorde(this.currentLvlData.hordesArray[this.hordeID].pattern, this.currentLvlData.hordesArray[this.hordeID].enemiesArray, this.currentLvlData.hordesArray[this.hordeID].speed)
            else {
                if (this.isBossFight)
                    this.isBossDead = true
                this.horde.loadNewHorde(this.currentLvlData.boss.pattern, this.currentLvlData.boss.view, this.currentLvlData.boss.speed)
                this.isBossFight = true
                console.log(this.horde.activeEnemy);

            }

        }
        this.collision()
        this.map.draw()
        this.player.update()
        this.horde.update()
        //moving map
    }
}
export default Level
