import type { UseCase } from "@/usecase/UseCase.ts";
import { Pet } from "../domain/Pet.ts";
import { RegisterPet as RegisterPetCommand } from "../domain/commands/RegisterPet.ts";
import type { Name } from "../domain/Name.ts";
import type { Id } from "../domain/Id.ts";

type Request = {
  name: Name;
};

type Response = {
  id: Id;
};

export class RegisterPet implements UseCase<Request, Response> {
  private petRepository: { save(pet: Pet): Promise<void> };

  constructor(petRepository: typeof this.petRepository) {
    this.petRepository = petRepository;
  }

  async execute({ name }: Request): Promise<Response> {
    const command = RegisterPetCommand.with(name);
    const newPet = Pet.init();

    newPet.execute(command);

    await this.petRepository.save(newPet);

    return { id: newPet.id! };
  }
}
