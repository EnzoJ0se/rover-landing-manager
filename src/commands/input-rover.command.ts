import { input } from "@inquirer/prompts";
import { CardinalDirectionEnum } from "../enums/cardinal-direction.enum";
import { RoverInput } from "../types/rover-input.type";

const inputToUpperCase: (input: string) => string = (input: string) => input.toUpperCase();

export async function inputRoverCommand(): Promise<RoverInput[]> {
	let exit: boolean = false;
	const inputs: RoverInput[] = [];

	do {
		inputs.push(await askRoverInput());

		const shouldDeployAnotherRover = await input({ message: "\nDo you want to deploy another rover? (Y/N)" });

		exit = shouldDeployAnotherRover.toUpperCase() !== "Y";
	} while (!exit);

	return inputs;
}

async function askRoverInput(): Promise<RoverInput> {
	let position = await input({ message: "\nInform the landing position: ", transformer: inputToUpperCase });
	position = position.trim().toUpperCase();

	if (!validatePositionInput(position)) {
		console.log("\nInvalid position. Please inform the position in the format 'X Y D', where X and Y are integers and D is a cardinal direction (N, E, S or W).");

		return askRoverInput();
	}

	const instructions = await askInstructionsInput();

	return {
		coordinates: { x: parseInt(position[0]), y: parseInt(position[2]) },
		direction: <CardinalDirectionEnum>position[4],
		instructions: instructions,
	};
}

async function askInstructionsInput(): Promise<string> {
	let instructions = await input({ message: "\nInform the instructions: ", transformer: inputToUpperCase });
	instructions = instructions.trim().toUpperCase();

	if (!validateInstructionsInput(instructions)) {
		console.log("\nInvalid instructions. Please inform the instructions using the letters 'L', 'R' and 'M'.");

		return askInstructionsInput();
	}

	return instructions;
}

function validatePositionInput(position: string): boolean {
	const regex = /^[0-9]+ [0-9]+ [NESW]$/;

	return regex.test(position);
}

function validateInstructionsInput(instructions: string): boolean {
	const regex = /^[LRM]+$/;

	return regex.test(instructions);
}
