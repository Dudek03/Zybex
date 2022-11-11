import { position, dimensions } from "./interfaces"
class Character {
    dimensions: dimensions
    hp: number
    position: position
    ctx: CanvasRenderingContext2D | null
    constructor(dimensions: dimensions, hp: number, position: position, ctx: CanvasRenderingContext2D | null) {
        this.dimensions = dimensions
        this.hp = hp
        this.position = position
        this.ctx = ctx
    }
    draw(): void {
        this.ctx!.fillStyle = "red"
        this.ctx!.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
}
export default Character
