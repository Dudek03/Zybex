import Enemy from "./Enemy"
import { enemyData } from "./interfaces"

class Horde {

    activeEnemy: Enemy[]
    enemiesArray: enemyData[];
    pattern: (x: number) => number;

    constructor(pattern: (x: number) => number, enemiesArray: enemyData[]) {
        this.activeEnemy = []
        this.pattern = pattern
        this.enemiesArray = enemiesArray
        this.enemiesArray.forEach(e => this.activeEnemy.push(new Enemy({ dimensions: e.dimensions, hp: e.hp, position: e.position, ctx: e.ctx, attack: e.attack, isDropping: e.isDropping })))
    }

    update() {
        this.activeEnemy.forEach(e => e.update())
    }
}
export default Horde
