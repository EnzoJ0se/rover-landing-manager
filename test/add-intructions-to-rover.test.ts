import { CardinalDirectionEnum } from "../src/enums/cardinal-direction.enum";
import { Plateau } from "../src/models/plateau";
import { PlateauService } from "../src/services/plateau.service";
import { RoverService } from "../src/services/rover.service";
import { RoverMovementEvent } from "../src/types/rover-movement-event.type";

describe('Send Instructions to Rover Tests', () => {
    it('Can add new instructions to rovers', () => {
        const plateauService: PlateauService = new PlateauService();
        const roverService: RoverService = new RoverService();

        const plateau: Plateau | null = plateauService.create({ x: 5, y: 5 });
        const roverMovements: RoverMovementEvent[] = roverService.create([
            { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMLMLMLMM' },
            { coordinates: { x: 3, y: 3 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
        ]);

        plateauService.syncRovers(roverMovements);

        expect(plateau).not.toBeNull();
        expect(plateau?.rovers.length).toBe(2);
        expect(plateau?.rovers[0]).toEqual({ id: 1, x: 1, y: 1, direction: CardinalDirectionEnum.N });
        expect(plateau?.rovers[1]).toEqual({ id: 2, x: 3, y: 0, direction: CardinalDirectionEnum.W });

        if (!plateau?.rovers.length) {
            return;
        }

        plateauService.syncRovers([
            { rover: plateau.rovers[0], instructions: 'RMMRMLLL' },
            { rover: plateau.rovers[1], instructions: 'LMMRMMRR' },
        ]);

        expect(plateau?.rovers[0]).toEqual({ id: 1, x: 3, y: 2, direction: CardinalDirectionEnum.W });
        expect(plateau?.rovers[1]).toEqual({ id: 2, x: 1, y: 2, direction: CardinalDirectionEnum.E });
    });
});
