import Entity from "./Entity"

export const createImage = (source: string) => {
    let image = new Image()
    image.src = source
    return image
}

export const rectCollision = (r1: Entity, r2: Entity) => {
    return ((r1.position.x + r1.dimensions.width >= r2.position.x && r1.position.x <= r2.position.x + r2.dimensions.width)
        && (r1.position.y + r1.dimensions.height >= r2.position.y && r1.position.y <= r2.position.y + r2.dimensions.height))
}