import { input } from "@inquirer/prompts";

export async function inputRoverInstruction(): Promise<string> {
	let instruction: string = await input({ message: "Inform the rover instruction: " });
	instruction = instruction.trim().toUpperCase();

	if (!validateInstructionsInput(instruction)) {
		console.log("\nInvalid instructions. Please inform the instructions using the letters 'L', 'R' and 'M'.");

		return inputRoverInstruction();
	}

	return instruction;
}

function validateInstructionsInput(instructions: string): boolean {
	const regex = /^[LRM]+$/;

	return regex.test(instructions);
}
