import Level from "./Level"
import UIController from "./UIController"
class Game {

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    public static deltaTime: number
    speed: number
    level!: Level
    isGameOver: boolean

    constructor() {
        Game.deltaTime = 1;
        let canvas = document.getElementById('main-canvas') as HTMLCanvasElement
        canvas.width = 1816
        canvas.height = 532
        let context = canvas.getContext("2d")
        this.context = context
        this.context!.imageSmoothingEnabled = false
        this.canvas = canvas
        this.speed = 0.09
        setTimeout(() => {
            this.level = new Level(1, this.speed, this.canvas, this.context);
            this.render()
        }, 0)
        this.isGameOver = false
        //context?.scale(2, 2) TY KURWO 
        console.log(window.innerWidth)
    }

    render(): void {
        if (this.level.isBossDead)
            UIController.getInstance().displayText(`U won your score was: ${document.getElementById("points")?.innerText}`)
        if (this.level.player.hp <= 0)
            UIController.getInstance().displayText("U lost")
        const start = performance.now()
        this.context!.fillStyle = "black"
        this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height)
        if (!this.level.isBossDead && this.level.player.hp > 0) {
            this.level.render()
        }

        requestAnimationFrame(() => {
            Game.deltaTime = performance.now() - start
            this.render()
        })
    }

}
new Game()
export default Game
