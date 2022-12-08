import { position, dimensions } from "./interfaces"
abstract class Entity {
    dimensions: dimensions
    hp: number
    position: position
    ctx: CanvasRenderingContext2D | null
    color: string
    constructor(dimensions: dimensions, hp: number, position: position, ctx: CanvasRenderingContext2D | null, color: string = "red") {
        this.dimensions = dimensions
        this.hp = hp
        this.position = position
        this.ctx = ctx
        this.color = color
    }
    draw(): void {
        this.ctx!.fillStyle = this.color
        this.ctx!.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
}
export default Entity
