import { Plateau } from "../models/plateau";
import { RoverMovementInstructions } from "../types/rover-movement-instruction.type";
import { RoverMovementEnum } from "../enums/rover-movement.enum";
import { Rover } from "../models/rover";
import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";
import { Coordinate } from "../types/coordinates.type";
import { RoverMovementEvent } from "../types/rover-movement-event.type";

export class PlateauService {
    private plateau: Plateau;
    private intructionData: RoverMovementInstructions = {
        [RoverMovementEnum.L]: (rover: Rover) => this.rotateAxis(rover, RoverMovementEnum.L),
        [RoverMovementEnum.R]: (rover: Rover) => this.rotateAxis(rover, RoverMovementEnum.R),
        [RoverMovementEnum.M]: (rover: Rover) => this.moveRover(rover),
    };

    public create(coordinates: Coordinate): Plateau | null {
        if (coordinates.x <= 0 || coordinates.y <= 0) {
            console.log('Invalid coordinates, please inform a valid plateau size.');

            return null;
        }

        this.plateau = new Plateau(coordinates.x, coordinates.y);

        return this.plateau;
    }

    public syncRovers(rovers: RoverMovementEvent[]): void {
        rovers.forEach((roverMovement: RoverMovementEvent) => {
            if (roverMovement.rover.x > this.plateau.x_size || roverMovement.rover.y > this.plateau.y_size) {
                console.log('Rover is out of bounds');

                return;
            }

            this.plateau.addRover({ rover: roverMovement.rover, instructions: roverMovement.instructions });
        });

        this.syncRoverMovements();
    }

    public syncRoverMovements(): void {
        if (!this.plateau.pendingMovements.length) {
            return;
        }

        const { rover, instructions } = this.plateau.pendingMovements.shift();
        const movementList: RoverMovementEnum[] = <RoverMovementEnum[]>instructions.split('');

        do {
            const movement: RoverMovementEnum = <RoverMovementEnum>movementList.shift();
            this.intructionData[movement](rover);
        } while (movementList.length);

        rover.printPosition();
        this.syncRoverMovements();
    }

    private rotateAxis(rover: Rover, direction: RoverMovementEnum): void {
        if (direction === RoverMovementEnum.L) {
            rover.direction = {
                [CardinalDirectionEnum.N]: CardinalDirectionEnum.W,
                [CardinalDirectionEnum.W]: CardinalDirectionEnum.S,
                [CardinalDirectionEnum.S]: CardinalDirectionEnum.E,
                [CardinalDirectionEnum.E]: CardinalDirectionEnum.N,
            }[rover.direction];

            return;
        }

        rover.direction = {
            [CardinalDirectionEnum.N]: CardinalDirectionEnum.E,
            [CardinalDirectionEnum.E]: CardinalDirectionEnum.S,
            [CardinalDirectionEnum.S]: CardinalDirectionEnum.W,
            [CardinalDirectionEnum.W]: CardinalDirectionEnum.N,
        }[rover.direction];
    }

    private moveRover(rover: Rover): void {
        if (rover.direction == CardinalDirectionEnum.N) {
            rover.y = rover.y - 1 > this.plateau.y_size ? this.plateau.y_size : rover.y - 1;

            return;
        }

        if (rover.direction == CardinalDirectionEnum.S) {
            rover.y = rover.y + 1 < 0 ? 0 : rover.y + 1;

            return;
        }

        if (rover.direction == CardinalDirectionEnum.E) {
            rover.x = rover.x + 1 > this.plateau.x_size ? this.plateau.x_size : rover.x + 1;

            return;
        }

        rover.x = rover.x - 1 < 0 ? 0 : rover.x - 1;
    }
}
