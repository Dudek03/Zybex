import Player from "./Player"
import Map from "./Map"
class Game {

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D | null
    player: Player
    map: Map
    speed: number

    constructor() {
        let canvas = document.getElementById('main-canvas') as HTMLCanvasElement
        canvas.width = 2000
        canvas.height = 700
        let context = canvas.getContext("2d")
        this.context = context
        this.canvas = canvas
        this.speed = 0.4
        this.player = new Player({ width: 50, height: 70 }, 3, { x: 10, y: 10 }, this.canvas, this.context)
        this.map = new Map(1, { x: 0, y: 0 }, this.canvas, this.context)
        this.render()
        context?.scale(2, 2)
    }

    render(): void {
        requestAnimationFrame(() => this.render())
        //rendering
        this.map.draw()
        this.player.update()
        this.player.activeProjectileArray.forEach(projectile => projectile.update())
        //moving map
        this.map.position.x -= this.speed
        this.player.referencePoint -= this.speed
        //movement
        this.player.velocity.x = 0
        this.player.velocity.y = 0

        if (this.player.keys.a.pressed && this.player.lastKeyHorizontal === 'a')
            this.player.velocity.x = -5
        else if (this.player.keys.d.pressed && this.player.lastKeyHorizontal === 'd')
            this.player.velocity.x = 5
        if (this.player.keys.w.pressed && this.player.lastKeyVertical === 'w')
            this.player.velocity.y = -5
        else if (this.player.keys.s.pressed && this.player.lastKeyVertical === 's')
            this.player.velocity.y = 5
    }

}
new Game()
export default Game
