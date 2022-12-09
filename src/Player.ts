import { position, dimensions, fireMode } from "./interfaces"
import Entity from "./Entity"
import Projectile from "./Projectile"
import Game from "./Game";
class Player extends Entity {

    keys: { a: { pressed: boolean }; d: { pressed: boolean }; w: { pressed: boolean }; s: { pressed: boolean } }
    lastKeyHorizontal: string
    lastKeyVertical: string
    velocity: { x: number; y: number; }
    canvas: HTMLCanvasElement
    isAttacking: boolean
    lastAttackTimestamp: number
    referencePoint: number
    distanceFromMap: number
    activeProjectileArray: Projectile[]
    presentShootingMode: number
    fireModes: fireMode[]

    constructor(dimensions: dimensions, hp: number, position: position, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null) {
        super(dimensions, hp, position, ctx, "green")
        this.canvas = canvas
        this.isAttacking = false
        this.lastAttackTimestamp = performance.now()
        this.lastKeyHorizontal = ""
        this.lastKeyVertical = ""
        this.presentShootingMode = 1
        this.activeProjectileArray = []
        this.referencePoint = 0
        this.distanceFromMap = Math.abs(this.referencePoint) + this.position.x
        this.velocity = { x: 0, y: 0 }
        this.keys = {
            a: { pressed: false },
            d: { pressed: false },
            w: { pressed: false },
            s: { pressed: false },
        }
        this.fireModes = [
            {
                id: 1,
                picked: true,
                active: true,
                delay: 100,
                power: 1,
                projectilesArray: [
                    { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: 1, y: 0 }, dmg: 1, hp: 1, owner: "player", speed: { vX: 0.2, vY: 0.2 } }
                ]
            },
            {
                id: 2,
                picked: false,
                active: false,
                delay: 1000,
                power: 1,
                projectilesArray: [
                    { position: { x: 0, y: 0 }, dimensions: { width: 70, height: 10 }, direction: { x: 1, y: 0 }, dmg: 5, hp: 1, owner: "player", speed: { vX: 0.2, vY: 0.2 } },
                    { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: 0, y: 1 }, dmg: 1, hp: 1, owner: "player", speed: { vX: 0.2, vY: 0.2 } },
                    { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: 0, y: -1 }, dmg: 1, hp: 1, owner: "player", speed: { vX: 0.2, vY: 0.2 } }
                ]
            },
            {
                id: 3,
                picked: true,
                active: false,
                delay: 500,
                power: 1,
                projectilesArray: [
                    { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 80 }, direction: { x: 1, y: 0 }, dmg: 5, hp: 1, owner: "player", speed: { vX: 0.4, vY: 0.2 } },
                    { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: 1, y: 1 }, dmg: 1, hp: 1, owner: "player", speed: { vX: 0.2, vY: 0.2 } },
                    { position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, direction: { x: 1, y: -1 }, dmg: 1, hp: 1, owner: "player", speed: { vX: 0.2, vY: 0.2 } }
                ]
            },
            // {
            //     id: 4,
            //     active: false,
            //     projectilesArray: [

            //     ]
            // },
            // {
            //     id: 5,
            //     active: false,
            //     projectilesArray: [

            //     ]
            // },
        ]
        this.moveInput()
    }

    moveInput() {
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'd':
                    this.keys.d.pressed = true
                    this.lastKeyHorizontal = 'd'
                    break
                case 'a':
                    this.keys.a.pressed = true
                    this.lastKeyHorizontal = 'a'
                    break
                case 'w':
                    this.keys.w.pressed = true
                    this.lastKeyVertical = 'w'
                    break
                case 's':
                    this.keys.s.pressed = true
                    this.lastKeyVertical = 's'
                    break
                case 'Control':
                    this.switchToNextShootingMode()
                    break
                case ' ':
                    this.isAttacking = true
                    this.attack()
                    break
            }
        })

        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                case 'd':
                    this.keys.d.pressed = false
                    break
                case 'a':
                    this.keys.a.pressed = false
                    break
                case 'w':
                    this.keys.w.pressed = false
                    break
                case 's':
                    this.keys.s.pressed = false
                    break
                case ' ':
                    this.isAttacking = false
                    break
            }
        })
    }

    switchToNextShootingMode() {
        do {
            if (this.presentShootingMode + 1 > this.fireModes.length) {
                this.presentShootingMode = 1
            }
            else this.presentShootingMode += 1
        } while (!this.fireModes[this.presentShootingMode - 1].picked)
        this.fireModes.forEach(e => {
            e.active = false
            if (e.id == this.presentShootingMode)
                e.active = true
        })

    }

    attack(): void {
        if (!this.isAttacking) return
        let activeMode = this.fireModes.find(e => e.active == true)
        let newTimeStamp = performance.now()
        if (newTimeStamp - this.lastAttackTimestamp < activeMode!.delay)
            return
        activeMode!.projectilesArray.forEach(projectile => {
            projectile.position = { x: this.position.x + this.dimensions.width / 2, y: this.position.y + this.dimensions.height / 2 - projectile.dimensions.height / 2 }
            projectile.dmg = projectile.dmg * activeMode!.power
            this.activeProjectileArray.push(new Projectile(projectile, this.ctx))
        })
        this.lastAttackTimestamp = newTimeStamp

    }

    update(): void {
        this.distanceFromMap = (Math.abs(this.referencePoint) + this.position.x) / 2 // setting distance from starting x point of image

        //movement
        const speed = 0.5
        if (this.keys.a.pressed && this.lastKeyHorizontal === 'a')
            this.velocity.x = -speed
        else if (this.keys.d.pressed && this.lastKeyHorizontal === 'd')
            this.velocity.x = speed
        if (this.keys.w.pressed && this.lastKeyVertical === 'w')
            this.velocity.y = -speed
        else if (this.keys.s.pressed && this.lastKeyVertical === 's')
            this.velocity.y = speed

        this.position.x += this.velocity.x * Game.deltaTime
        this.position.y += this.velocity.y * Game.deltaTime
        if (this.position.x <= 0) {
            this.velocity.x = 0
            this.position.x = 0
        }
        else if (this.position.x + this.dimensions.width >= this.canvas.width / 2) {
            this.position.x = this.canvas.width / 2 - this.dimensions.width
            this.velocity.x = 0
        }
        if (this.position.y <= 0) {
            this.velocity.y = 0
            this.position.y = 0
        }
        else if (this.position.y + this.dimensions.height >= this.canvas.height / 2) {
            this.position.y = this.canvas.height / 2 - this.dimensions.height
            this.velocity.y = 0
        }
        this.activeProjectileArray.forEach(projectile => projectile.update())
        this.activeProjectileArray = this.activeProjectileArray.filter(e =>
            e.position.x > 0 && e.position.y > 0 && e.position.x <= this.canvas.width / 2 && e.position.y <= this.canvas.height / 2 && e.hp > 0
        )
        this.velocity.x = 0
        this.velocity.y = 0
        this.draw()
        this.attack()
    }
}
export default Player
