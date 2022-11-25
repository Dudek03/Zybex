import Entity from "./Entity"
import Projectile from "./Projectile";
import { dimensions, position, projectile } from "./interfaces"
class Enemy extends Entity {

    attackInfo: { delay: number; projectilesArray: projectile[] }
    lastAttackTimestamp: number
    activeProjectileArray: Projectile[]
    isDropping: boolean;

    constructor(data: { dimensions: dimensions, hp: number, position: position, ctx: CanvasRenderingContext2D | null, attack: { delay: number, projectilesArray: projectile[] }, isDropping: boolean }) {
        super(data.dimensions, data.hp, data.position, data.ctx)
        this.attackInfo = data.attack
        this.isDropping = data.isDropping
        this.lastAttackTimestamp = Date.now() - 1000
        this.activeProjectileArray = []
    }

    attack(): void {
        let newTimeStamp = Date.now()
        if (newTimeStamp - this.lastAttackTimestamp < this.attackInfo.delay)
            return
        this.attackInfo.projectilesArray.forEach(projectile => {
            projectile.position = { x: this.position.x + this.dimensions.width / 2, y: this.position.y + this.dimensions.height / 2 - projectile.dimensions.height / 2 }
            this.activeProjectileArray.push(new Projectile(projectile, this.ctx))
        })
        this.lastAttackTimestamp = newTimeStamp
    }

    update() {
        this.draw()
        this.attack()

    }
}
export default Enemy
