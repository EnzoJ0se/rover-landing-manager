import { select } from "@inquirer/prompts";
import { Plateau } from "./models/plateau";
import { RoverService } from "./services/rover.service";
import { PlateauService } from "./services/plateau.service";
import { inputRoverCommand } from "./commands/input-rover.command";
import { RoverInput } from "./types/rover-input.type";
import { inputPlateauCoordinates } from "./commands/input-plateau-coordinates.command";
import { RoverMovementEvent } from "./types/rover-movement-event.type";
import { Rover } from "./models/rover";
import { selectRover } from "./commands/select-rover.command";
import { inputRoverInstruction } from "./commands/input-rover-instruction";

const roverService: RoverService = new RoverService();
const plateauService: PlateauService = new PlateauService();

async function main() {
    let exit: boolean = false;
    let plateau: Plateau = null;

    do {
        plateau = plateauService.create(await inputPlateauCoordinates());
    } while (!plateau);

    do {
        const answer = await select({
            message: 'Choose an Option',
            choices: [
                {
                    name: '1. Land Rover',
                    value: async () => {
                        const roverData: RoverInput[] = await inputRoverCommand();
                        const roverMovements: RoverMovementEvent[] = roverService.create(roverData);

                        plateauService.syncRovers(roverMovements);
                    },
                },
                {
                    name: '2. Move Rover',
                    value: async () => {
                        const rover: Rover = await selectRover(plateau);

                        if (rover) {
                            const instructions: string = await inputRoverInstruction();
                            plateauService.syncRovers([{ rover, instructions }]);
                        }
                    },
                },
                {
                    name: '3. Exit',
                    value: async () => {
                        exit = true;
                    },
                },
            ],
        });

        await answer();
    } while (!exit);
}

main();
