import { position, dimensions } from "./interfaces"
import { createImage } from "./utilities"
abstract class Entity {
    dimensions: dimensions
    hp: number
    position: position
    ctx: CanvasRenderingContext2D | null
    color: string
    image: HTMLImageElement
    constructor(dimensions: dimensions, hp: number, position: position, ctx: CanvasRenderingContext2D | null, color: string = "red", image: string = "") {
        this.dimensions = dimensions
        this.hp = hp
        this.position = position
        this.ctx = ctx
        this.color = color
        this.image = image === "" ? createImage(`./player.PNG`) : createImage(`./${image}.PNG`)
    }
    draw(): void {
        this.ctx!.fillStyle = this.color
        this.ctx!.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
    drawGraphic(): void {
        this.ctx!.drawImage(this.image, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
}
export default Entity
