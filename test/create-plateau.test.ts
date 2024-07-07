import { Plateau } from "../src/models/plateau";
import { PlateauService } from "../src/services/plateau.service";

describe('Plateau Tests', () => {
	it('Can create plateau', () => {
		const plateauService: PlateauService = new PlateauService();
		const plateau: Plateau|null = plateauService.create({ x: 5, y: 5 });

		expect(plateau).toEqual({ pendingRoverMovements: [], x_size: 5, y_size: 5, rovers: [] });
	});

	it('Can\'t create plateau with negative values', () => {
		const plateauService: PlateauService = new PlateauService();
		const plateau: Plateau | null = plateauService.create({ x: -1, y: 1 });

		expect(plateau).toBeNull();
	});

	it('Can\'t create plateau with zeroed values', () => {
		const plateauService: PlateauService = new PlateauService();
		const plateau: Plateau | null = plateauService.create({ x: -1, y: 1 });

		expect(plateau).toBeNull();
	});
});
