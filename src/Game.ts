import Level from "./Level"
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
        canvas.width = 2000
        canvas.height = 700
        let context = canvas.getContext("2d")
        this.context = context
        this.canvas = canvas
        this.speed = 0.04
        setTimeout(() => {
            this.level = new Level(1, this.speed, this.canvas, this.context);
            this.render()
        }, 0)
        this.isGameOver = false
        context ?.scale(2, 2)
    }

    gameOver(text: string) {
        alert(text)
    }

    render(): void {
        this.level.isBossDead? this.gameOver("u win") : () => { }
        this.level.player.hp <= 0? this.gameOver("u lost") : () => { }
        const start = performance.now()
        this.context!.fillStyle = "black"
        this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.level.render()
        requestAnimationFrame(() => {
            Game.deltaTime = performance.now() - start
            this.render()
        })
    }

}
new Game()
export default Game
