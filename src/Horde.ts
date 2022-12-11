import Enemy from "./Enemy"
import Game from "./Game";
import { enemyData } from "./interfaces"

class Horde {

    activeEnemy: Enemy[]
    enemiesArray: enemyData[];
    pattern: (x: number) => number;
    canvas: HTMLCanvasElement
    speed: number;

    constructor(pattern: (x: number) => number, enemiesArray: enemyData[], speed: number, canvas: HTMLCanvasElement) {
        this.activeEnemy = []
        this.pattern = pattern
        this.enemiesArray = enemiesArray
        this.speed = speed
        this.canvas = canvas
        this.enemiesArray.forEach(e => this.activeEnemy.push(new Enemy({ dimensions: e.dimensions, hp: e.hp, position: e.position, ctx: e.ctx, canvas: this.canvas, attack: e.attack, isDropping: e.isDropping, image: e.image })))
    }

    loadNewHorde(pattern: (x: number) => number, enemiesArray: enemyData[], speed: number) {
        this.pattern = pattern
        this.enemiesArray = enemiesArray
        this.speed = speed
        this.enemiesArray.forEach(e => this.activeEnemy.push(new Enemy({ dimensions: e.dimensions, hp: e.hp, position: e.position, ctx: e.ctx, canvas: this.canvas, attack: e.attack, isDropping: e.isDropping, image: e.image })))
    }

    checkEnemies() {
        this.activeEnemy = this.activeEnemy.filter(e =>
            e.position.x > 0 && e.position.y > 0 && e.position.x <= this.canvas.width && e.position.y <= this.canvas.height && e.hp > 0
        )
    }

    update() {
        this.checkEnemies()
        this.activeEnemy.forEach(e => {
            e.position.x -= this.speed * Game.deltaTime
            e.position.y = this.pattern(e.position.x) + this.canvas.height / 2
            e.update()
        })
    }
}
export default Horde
