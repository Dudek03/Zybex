import Player from "./Player"
import Map from "./Map"
import Enemy from "./Enemy"
import { enemyData } from "./interfaces"
import Game from "./Game";

class Level {

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    lvNum: number
    player: Player
    map: Map
    speed: number
    isBossDead: boolean
    levelsInfo:  { hordesArray: { pattern: (x: number) => number; enemiesArray: enemyData[] }[]; boss: { pattern: (x: number) => number; view: enemyData[] }; } []
    currentLvlData: { hordesArray: { pattern: (x: number) => number; enemiesArray: enemyData[]; }[]; boss: { pattern: (x: number) => number; view: enemyData[]; }; };
    hordeID: number;

    constructor(lvNum: number, speed: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null) {
        this.lvNum = lvNum
        this.player = new Player({ width: 50, height: 70 }, 3, { x: 10, y: 10 }, canvas, context)
        this.map = new Map(this.lvNum, { x: 0, y: 0 }, canvas, context)
        this.speed = speed
        this.canvas = canvas
        this.context = context
        this.isBossDead = false
        this.levelsInfo = [
             {
                hordesArray: [
                    {
                        pattern: (x: number): number => { return Math.sin(x) },
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 10, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false }
                        ]
                    },
                    {
                        pattern: (x: number): number => { return Math.abs(Math.sin(x)) },
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 10, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false },
                            { dimensions: { width: 40, height: 40 }, hp: 10, position: { x: this.canvas.width - 40, y: 90 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false },
                            { dimensions: { width: 40, height: 40 }, hp: 10, position: { x: this.canvas.width - 40, y: 130 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false }
                        ]
                    },
                ],
                boss: {
                    pattern: (x: number): number => { return Math.sin(x) },
                    view: [{ dimensions: { width: 40, height: 40 }, hp: 10, position: { x: this.canvas.width / 2 - 40, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: false }]
                }
            }
        ]
        this.currentLvlData = this.levelsInfo[lvNum - 1]
        this.hordeID = 0
        
    }


    render() {
        this.map.draw()
        this.player.activeProjectileArray.forEach(projectile => projectile.update())
        this.player.activeProjectileArray = this.player.activeProjectileArray.filter(e =>
            e.position.x > 0 && e.position.y > 0 && e.position.x <= this.canvas.width / 2 && e.position.y <= this.canvas.height / 2
        )
        this.player.update()
        //moving map
        this.map.position.x -= this.speed * Game.deltaTime
        this.player.referencePoint -= this.speed * Game.deltaTime
        //movement
        this.player.velocity.x = 0
        this.player.velocity.y = 0
    }
}
export default Level
