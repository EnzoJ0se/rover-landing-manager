import { input } from "@inquirer/prompts";
import { Coordinate } from "../types/coordinates.type";

function validatePlateauInput(input: string): boolean {
    const regex = /^[0-9]+ [0-9]+$/;

    return regex.test(input);
}

export async function inputPlateauCoordinates(): Promise<Coordinate> {
    let plateauInput: string = await input({ message: "Welcome to the Rover Control Center! Inform the plateau size: " });
    plateauInput = plateauInput.trim();

    if (!validatePlateauInput(plateauInput)) {
        console.log("Invalid plateau size. Please inform the size in the format 'X Y', where X and Y are integers.");

        return inputPlateauCoordinates();
    }

    const coordinates = plateauInput.split(' ');

    return {
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
    };
}
