import { CardinalDirectionEnum } from "../src/enums/cardinal-direction.enum";
import { Plateau } from "../src/models/plateau";
import { PlateauService } from "../src/services/plateau.service";
import { RoverService } from "../src/services/rover.service";
import { RoverMovementEvent } from "../src/types/rover-movement-event.type";

describe('Create Rover Tests', () => {
    it('Can create Rovers', () => {
        const roverService: RoverService = new RoverService();
        const roverMovements: RoverMovementEvent[] = roverService.create([
            { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMLMLMLMM' },
            { coordinates: { x: 3, y: 3 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
        ]);

        expect(roverMovements.length).toBe(2);
        expect(roverMovements[0].instructions).toBe('LMLMLMLMM');
        expect(roverMovements[0].rover).toEqual({ x: 1, y: 2, direction: CardinalDirectionEnum.N });
        expect(roverMovements[1].instructions).toBe('RRMMML');
        expect(roverMovements[1].rover).toEqual({ x: 3, y: 3, direction: CardinalDirectionEnum.S });
    });

    it('Can land Rovers', () => {
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
    });

    it('Can\'t land Rovers outside plateau', () => {
        const plateauService: PlateauService = new PlateauService();
        const roverService: RoverService = new RoverService();

        const plateau: Plateau | null = plateauService.create({ x: 5, y: 5 });
        const roverMovements: RoverMovementEvent[] = roverService.create([
            { coordinates: { x: 1, y: 2 }, direction: CardinalDirectionEnum.N, instructions: 'LMLMLMLMM' },
            { coordinates: { x: 3, y: 3 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
            { coordinates: { x: 6, y: 6 }, direction: CardinalDirectionEnum.S, instructions: 'RRMMML' },
        ]);

        plateauService.syncRovers(roverMovements);

        expect(plateau).not.toBeNull();
        expect(plateau?.rovers.length).toBe(2);
        expect(plateau?.rovers[0]).toEqual({ id: 1, x: 1, y: 1, direction: CardinalDirectionEnum.N });
        expect(plateau?.rovers[1]).toEqual({ id: 2, x: 3, y: 0, direction: CardinalDirectionEnum.W });
    });
});
