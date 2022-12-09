import Entity from "./Entity";
import { dimensions, position } from "./interfaces";

class Item extends Entity {
    dropInfo: {
        addHp: number; addFireMode: {
            id: number; value: number;
        } | null;
    };
    constructor(data: { dimensions: dimensions, hp: number, position: position, ctx: CanvasRenderingContext2D | null }, dropInfo: { addHp: number, addFireMode: { id: number, value: number } | null }) {
        super(data.dimensions, data.hp, data.position, data.ctx, "blue")
        this.dropInfo = dropInfo
    }
}

export default Item
