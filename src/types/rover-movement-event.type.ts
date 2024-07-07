import { Rover } from "../models/rover";

export type RoverMovementEvent = {
	rover: Rover,
	instructions: string
};
