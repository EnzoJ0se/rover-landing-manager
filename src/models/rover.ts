import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";

export class Rover {
	public id: number;
	public x: number;
	public y: number;
	public direction: CardinalDirectionEnum;

	public constructor(x: number, y: number, direction: CardinalDirectionEnum) {
		this.x = x;
		this.y = y;
		this.direction = direction;
	}

	public printPosition(): void {
		console.log('-------------------------------------------');
		console.log(`Rover ${this.id} position: ${this.x} ${this.y} ${this.direction}`);
		console.log('-------------------------------------------\n');
	}
}
