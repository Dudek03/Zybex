export const createImage = (source: string) => {
    let image = new Image()
    image.src = source
    return image
}