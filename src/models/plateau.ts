import { RoverMovementEvent } from "../types/rover-movement-event.type";
import { Rover } from "./rover";

export class Plateau {
    public x_size: number;
    public y_size: number;
    public rovers: Rover[];

    private pendingRoverMovements: RoverMovementEvent[] = [];

    public constructor(x_size: number, y_size: number) {
        this.x_size = x_size;
        this.y_size = y_size;
        this.rovers = [];
    }

    public get pendingMovements(): RoverMovementEvent[] {
        return this.pendingRoverMovements;
    }

    public addRover(roverInput: RoverMovementEvent): void {
        if (!this.rovers.some(rover => rover.id == roverInput.rover.id)) {
            roverInput.rover.id = this.rovers.length + 1;
            this.rovers.push(roverInput.rover);
        }

        this.pendingRoverMovements.push(roverInput);
    }
}
