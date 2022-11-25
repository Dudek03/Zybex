export interface position { x: number, y: number }
export interface dimensions { width: number, height: number }
export interface fireMode { id: number; picked: boolean; active: boolean; delay: number; projectilesArray: projectile[]; }
export interface projectile { position: { x: number; y: number; }; dimensions: { width: number; height: number; }; direction: { x: number; y: number; }; dmg: number; owner: string; speed: { vX: number; vY: number; } }
export interface attack { delay: number, projectilesArray: projectile[] | [] }