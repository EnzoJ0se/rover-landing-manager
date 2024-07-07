import { Rover } from "../models/rover";
import { RoverInput } from "../types/rover-input.type";
import { RoverMovementEvent } from "../types/rover-movement-event.type";

export class RoverService {
	public create(roverData: RoverInput[]): RoverMovementEvent[] {
		return roverData.map((data: RoverInput) => ({
			rover: new Rover(data.coordinates.x, data.coordinates.y, data.direction),
			instructions: data.instructions
		}));
	}
}
