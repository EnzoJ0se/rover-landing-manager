import { RoverMovementEnum } from "../enums/rover-movement.enum"
import { Rover } from "../models/rover";

export type RoverMovementInstructions = {
	[key in RoverMovementEnum]: (rover: Rover) => void;
};
