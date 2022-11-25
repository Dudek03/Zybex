import Player from "./Player"
import Map from "./Map"
import Level from "./Level"
class Game {

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    // player: Player
    // map: Map
    speed: number
    level: Level

    constructor() {
        let canvas = document.getElementById('main-canvas') as HTMLCanvasElement
        canvas.width = 2000
        canvas.height = 700
        let context = canvas.getContext("2d")
        this.context = context
        this.canvas = canvas
        this.speed = 0.4
        this.level = new Level(1, this.speed, this.canvas, this.context)
        // this.player = new Player({ width: 50, height: 70 }, 3, { x: 10, y: 10 }, this.canvas, this.context)
        // this.map = new Map(1, { x: 0, y: 0 }, this.canvas, this.context)
        this.render()
        context?.scale(2, 2)
    }

    render(): void {
        requestAnimationFrame(() => this.render())
        this.context!.fillStyle = "black"
        this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height)
        //rendering
        this.level.render()
        // this.map.draw()
        // this.player.activeProjectileArray.forEach(projectile => projectile.update())
        // this.player.activeProjectileArray = this.player.activeProjectileArray.filter(e =>
        //     e.position.x > 0 && e.position.y > 0 && e.position.x <= this.canvas.width / 2 && e.position.y <= this.canvas.height / 2
        // )
        // this.player.update()
        // //moving map
        // this.map.position.x -= this.speed
        // this.player.referencePoint -= this.speed
        // //movement
        // this.player.velocity.x = 0
        // this.player.velocity.y = 0

    }

}
new Game()
export default Game
