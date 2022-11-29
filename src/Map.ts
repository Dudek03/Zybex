import { position } from "./interfaces"
import { createImage } from "./utilities"
class Map {

    stageNum: number
    position: position
    image: HTMLImageElement
    context: CanvasRenderingContext2D | null
    canvas: HTMLCanvasElement

    constructor(stageNum: number, position: position, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null) {
        this.stageNum = stageNum
        this.position = position
        this.image = createImage(`/level${stageNum}/bgMap.png`)
        this.context = ctx
        this.canvas = canvas
    }
    changeStage(stageNum: number): void {
        this.image = createImage(`/level${stageNum}/bgMap.png`)
    }
    draw(): void {
        this.context!.drawImage(this.image, this.position.x, this.position.y, 7500, this.canvas.height / 2)
    }
}
export default Map
