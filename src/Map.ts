import { position } from "./interfaces"
import { createImage, createImageAsync } from "./utilities"
class Map {

    stageNum: number
    position: position
    image: HTMLImageElement
    context: CanvasRenderingContext2D | null
    canvas: HTMLCanvasElement
    collisionData!: ImageData
    ctx: CanvasRenderingContext2D | null

    constructor(stageNum: number, position: position, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null) {
        this.stageNum = stageNum
        this.position = position
        this.image = createImage(`./level${stageNum}/bgMap.png`)
        this.context = ctx
        this.canvas = canvas
        this.ctx = ctx
    }
    changeStage(stageNum: number): void {
        this.image = createImage(`./level${stageNum}/bgMap.png`)
    }
    draw(): void {
        this.context!.drawImage(this.image, this.position.x, this.position.y, 7265 * 4, this.canvas.height)
    }

    async createCanvas() {
        const image = await createImageAsync(`./level${this.stageNum}/collision.png`)
        //const image = await createImageAsync(`./level${this.stageNum}/test.png`)
        const canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height
        this.ctx = canvas.getContext("2d")
        if (!this.ctx) throw new Error("nie ma ctx")
        this.ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        this.collisionData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
    }

    async getAreaData(x: number, y: number, width: number, height: number): Promise<Array<Array<number[]>>> {
        x = Math.floor(x)
        y = Math.round(y)
        if (!this.collisionData) {
            await this.createCanvas()
        }
        let array: Array<Array<number[]>> = []
        for (let i = x; i < width + x; i++) {
            let array2 = []
            for (let j = y; j < height + y; j++) {
                const red = j * (this.collisionData.width * 4) + i * 4
                array2.push([this.collisionData.data[red], this.collisionData.data[red + 1], this.collisionData.data[red + 2], this.collisionData.data[red + 3]])
            }
            array.push(array2)
        }
        return array
    }

}
export default Map
