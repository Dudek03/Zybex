import Entity from "./Entity"
import Projectile from "./Projectile";
import { dimensions, position, projectile } from "./interfaces"
import Item from "./Item";
class Enemy extends Entity {

    attackInfo: { delay: number; projectilesArray: projectile[] }
    lastAttackTimestamp: number
    activeProjectileArray: Projectile[]
    isDropping: { addHp: number, addFireMode: { id: number, value: number } | null };
    canvas: HTMLCanvasElement;

    constructor(data: { dimensions: dimensions, hp: number, position: position, ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement, attack: { delay: number, projectilesArray: projectile[] }, isDropping: { addHp: number, addFireMode: { id: number, value: number } | null } }) {
        super(data.dimensions, data.hp, data.position, data.ctx)
        this.canvas = data.canvas
        this.attackInfo = data.attack
        this.isDropping = data.isDropping
        this.lastAttackTimestamp = performance.now()
        this.activeProjectileArray = []

    }

    attack(): void {
        let newTimeStamp = performance.now()
        if (newTimeStamp - this.lastAttackTimestamp < this.attackInfo.delay)
            return
        this.attackInfo.projectilesArray.forEach(projectile => {
            projectile.position = { x: this.position.x + this.dimensions.width / 2, y: this.position.y + this.dimensions.height / 2 - projectile.dimensions.height / 2 }
            this.activeProjectileArray.push(new Projectile(projectile, this.ctx))
        })
        this.lastAttackTimestamp = newTimeStamp
    }

    drop(): Item {
        console.log("drop")
        return new Item({ dimensions: { width: 20, height: 30 }, hp: 1, position: { x: this.position.x, y: this.position.y }, ctx: this.ctx }, { addHp: this.isDropping.addHp, addFireMode: this.isDropping.addFireMode })
    }

    update(): void {
        this.activeProjectileArray.forEach(bullet => bullet.update())
        this.activeProjectileArray = this.activeProjectileArray.filter(e =>
            e.position.x > 0 && e.position.y > 0 && e.position.x <= this.canvas.width / 2 && e.position.y <= this.canvas.height / 2 && e.hp > 0
        )
        this.draw()
        this.attack()

    }
}
export default Enemy
