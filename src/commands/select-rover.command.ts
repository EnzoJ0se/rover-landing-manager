import { select } from "@inquirer/prompts";
import { Plateau } from "../models/plateau";
import { Rover } from "../models/rover";

export async function selectRover(plateau: Plateau): Promise<Rover | null> {
	const options = plateau.rovers.map((rover) => ({
		name: `Rover ${rover.id}: ${rover.x} ${rover.y} ${rover.direction}`,
		value: rover,
	}));

	options.push({ name: 'Cancel', value: null });
	const answer = await select({ message: 'Select a Rover', choices: options });

	return answer;
}
