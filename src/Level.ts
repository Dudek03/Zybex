import Player from "./Player"
import Map from "./Map"
import { enemyData } from "./interfaces"
import Game from "./Game";
import Horde from "./Horde";
import Item from "./Item";
import { rectCollision } from "./utilities"
import UIController from "./UIController"

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
    isBossFight: boolean
    activeItems: Item[]

    constructor(lvNum: number, speed: number, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D | null) {
        this.lvNum = lvNum
        this.player = new Player({ width: 50, height: 70 }, 3, { x: 10, y: 80 }, canvas, context, "player")
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
                        speed: 0.06,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 7, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 90, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: { addHp: 1, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 5, position: { x: this.canvas.width - 140, y: 40 }, ctx: this.context, attack: { delay: 10, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: { id: 2, value: 1 }, image: '/weapons/weapon2' }, image: "enemy" }
                        ]
                    },
                    {
                        pattern: (x: number): number => { return Math.abs(Math.sin(x / 50)) * 100 },
                        speed: 0.2,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 90, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 140, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" }
                        ]
                    },
                    {
                        pattern: (x: number): number => { return -Math.abs(x / 12) },
                        speed: 0.7,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: { id: 1, value: 3 }, image: "/weapons/weapon1" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 90, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 4, position: { x: this.canvas.width - 140, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 3, position: { x: this.canvas.width - 190, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 1, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 3, position: { x: this.canvas.width - 230, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 1, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 280, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                        ]
                    },
                    {
                        pattern: (x: number): number => { return (Math.sin(3 * x / 200) * Math.cos(2 * x / 200)) * 100 },
                        speed: 0.3,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 600, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 90, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 140, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 190, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 230, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 280, y: 40 }, ctx: this.context, attack: { delay: 600, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                        ]
                    },
                    {
                        pattern: (x: number): number => { return Math.abs((x + 15) / 250) * 20 },
                        speed: 0.3,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 600, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 90, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 140, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 190, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 230, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 280, y: 40 }, ctx: this.context, attack: { delay: 600, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                        ]
                    },
                    {
                        pattern: (x: number): number => { return (x / 80) * Math.sin(x / 100) },
                        speed: 0.3,
                        enemiesArray: [
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: { delay: 600, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 90, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 140, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 190, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 230, y: 40 }, ctx: this.context, attack: { delay: 1000, projectilesArray: [] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                            { dimensions: { width: 40, height: 40 }, hp: 6, position: { x: this.canvas.width - 280, y: 40 }, ctx: this.context, attack: { delay: 600, projectilesArray: [{ position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" }] }, isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "enemy" },
                        ]
                    },
                ],
                boss: {
                    pattern: (x: number): number => { return (Math.sin(3 * x / 200) * Math.cos(2 * x / 200)) * 200 },
                    speed: 0.07,
                    view: [{
                        dimensions: { width: 100, height: 80 }, hp: 20, position: { x: this.canvas.width - 40, y: 40 }, ctx: this.context, attack: {
                            delay: 1000, projectilesArray: [
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 0 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.5, vY: 0.2 }, image: "bullet2" },
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 40 }, direction: { x: -1, y: -0.5 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.4, vY: 0.2 }, image: "bullet2" },
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 40 }, direction: { x: -1, y: 0.5 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.4, vY: 0.2 }, image: "bullet2" },
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 1 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.2, vY: 0.2 }, image: "bullet2" },
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: -1 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.2, vY: 0.2 }, image: "bullet2" },
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: 1 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.6, vY: 0.1 }, image: "bullet2" },
                                { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: -1, y: -1 }, dmg: 1, hp: 1, owner: "enemy", speed: { vX: 0.6, vY: 0.1 }, image: "bullet2" },
                            ]
                        },
                        isDropping: { addHp: 0, addFireMode: null, image: "hpek" }, image: "boss"
                    }]
                }
            }
        ]
        this.activeItems = []
        this.currentLvlData = this.levelsInfo[lvNum - 1]
        this.hordeID = 0
        this.horde = new Horde(this.currentLvlData.hordesArray[this.hordeID].pattern, this.currentLvlData.hordesArray[this.hordeID].enemiesArray, this.currentLvlData.hordesArray[this.hordeID].speed, this.canvas)
        UIController.getInstance().updateHp(this.player.hp)
    }

    collision() {
        this.map.getAreaData(this.player.distanceFromMap / 4, this.player.position.y / 4, this.player.dimensions.width / 4, this.player.dimensions.height / 4).then((data) => {
            if (data.some(e => e.some(pixel => pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0))) {
                console.log("sieeema", Math.round(this.player.distanceFromMap / 4), Math.round(this.player.position.y / 4))
                this.player.hp--
                this.player.position.x = 10
                this.player.position.y = this.canvas.height / 2
                UIController.getInstance().updateHp(this.player.hp)
            }

        })

        //collision between players projectiles and enemies
        this.player.activeProjectileArray.forEach(bullet => {
            this.horde.activeEnemy.forEach(ene => {
                if (rectCollision(bullet, ene)) {
                    bullet.hp--
                    ene.hp = ene.hp - bullet.dmg
                    //console.log(ene.hp)
                    if (ene.hp <= 0) {
                        UIController.getInstance().updateScore(200)
                    }
                    if (ene.hp <= 0 && (ene.isDropping.addHp != 0 || ene.isDropping.addFireMode != null)) {
                        this.activeItems.push(ene.drop())
                    }
                }
            })
        })
        //collision between enemies and player
        this.horde.activeEnemy.forEach(ene => {
            if (rectCollision(this.player, ene)) {
                this.player.position.x = 10
                this.player.position.y = this.canvas.height / 2
                this.player.hp--
                UIController.getInstance().updateHp(this.player.hp)
            }

        })
        //collision between enemies projectiles and player
        this.horde.activeEnemy.forEach(enemy => {
            enemy.activeProjectileArray.forEach(bullet => {
                if (rectCollision(this.player, bullet)) {
                    this.player.position.x = 10
                    this.player.position.y = this.canvas.height / 2
                    this.player.hp--
                    bullet.hp--
                    UIController.getInstance().updateHp(this.player.hp)
                }
            })
        })
        //collision between player and items
        this.activeItems.forEach(item => {
            if (rectCollision(this.player, item)) {
                item.hp--
                this.player.hp += item.dropInfo.addHp
                UIController.getInstance().updateHp(this.player.hp)
                if (!item.dropInfo.addFireMode) return
                if (!this.player.fireModes[item.dropInfo.addFireMode.id - 1].picked) {
                    this.player.fireModes[item.dropInfo.addFireMode.id - 1].picked = true
                    UIController.getInstance().removeGray(item.dropInfo.addFireMode.id)
                }

                else
                    this.player.fireModes[item.dropInfo.addFireMode.id - 1].power += item.dropInfo.addFireMode.value
            }
        })
    }

    render() {
        this.map.position.x -= this.speed * Game.deltaTime
        this.player.referencePoint -= this.speed * Game.deltaTime
        this.activeItems = this.activeItems.filter(e => e.hp > 0)
        if (!this.horde.activeEnemy.length) {
            this.hordeID = this.hordeID + 1
            if (this.currentLvlData.hordesArray[this.hordeID])
                this.horde.loadNewHorde(this.currentLvlData.hordesArray[this.hordeID].pattern, this.currentLvlData.hordesArray[this.hordeID].enemiesArray, this.currentLvlData.hordesArray[this.hordeID].speed)
            else {
                if (this.isBossFight)
                    this.isBossDead = true
                this.horde.loadNewHorde(this.currentLvlData.boss.pattern, this.currentLvlData.boss.view, this.currentLvlData.boss.speed)
                this.isBossFight = true
            }
        }
        this.collision()
        this.map.draw()
        this.player.update()
        this.activeItems.forEach(i => i.drawGraphic())
        this.horde.update()
        //moving map
    }
}
export default Level
