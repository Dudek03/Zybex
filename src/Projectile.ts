import { position, dimensions } from "./interfaces"
import Game from "./Game";
import Entity from "./Entity";
class Projectile extends Entity {

    // position: position
    // dimensions: dimensions
    direction: { x: number, y: number }
    dmg: number
    owner: string
    speed: { vX: number, vY: number }
    context: CanvasRenderingContext2D | null

    constructor(data: { position: position; dimensions: dimensions; direction: { x: number; y: number }; dmg: number; hp: number; owner: string; speed: { vX: number, vY: number }, image?: string }, context: CanvasRenderingContext2D | null) {
        super(data.dimensions, data.hp, data.position, context, "gray", data.image)
        //this.position = data.position
        //this.dimensions = data.dimensions
        this.direction = data.direction
        this.dmg = data.dmg
        this.owner = data.owner
        this.speed = data.speed
        this.context = context
    }

    update(): void {
        this.drawGraphic()
        this.position.x += this.direction.x * this.speed.vX * Game.deltaTime
        this.position.y += this.direction.y * this.speed.vY * Game.deltaTime
    }
}
export default Projectile
