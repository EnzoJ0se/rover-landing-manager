import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";
import { Coordinate } from "./coordinates.type";

export type RoverInput = {
	coordinates: Coordinate;
	direction: CardinalDirectionEnum;
	instructions: string;
};
