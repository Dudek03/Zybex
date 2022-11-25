import { position, dimensions } from "./interfaces"
import Game from "./Game";
class Projectile {

    position: position
    dimensions: dimensions
    direction: { x: number, y: number }
    dmg: number
    owner: string
    speed: { vX: number, vY: number }
    context: CanvasRenderingContext2D | null

    constructor(data: { position: position; dimensions: dimensions; direction: { x: number; y: number }; dmg: number; owner: string; speed: { vX: number, vY: number } }, context: CanvasRenderingContext2D | null) {
        this.position = data.position
        this.dimensions = data.dimensions
        this.direction = data.direction
        this.dmg = data.dmg
        this.owner = data.owner
        this.speed = data.speed
        this.context = context
    }

    draw(): void {
        this.context!.fillStyle = "gray"
        this.context!.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }

    update(): void {
        this.draw()
        this.position.x += this.direction.x * this.speed.vX * Game.deltaTime
        this.position.y += this.direction.y * this.speed.vY * Game.deltaTime
    }
}
export default Projectile
