import { Id } from "./Id.ts";
import { Name } from "./Name.ts";
import { EntityState } from "../../../foundation/domain/EntityState.ts";
import { z } from "zod";
import { Entity } from "../../../foundation/domain/Entity.ts";
import { PetRenamed } from "./PetRenamed.ts";
import { PetRegistered } from "./PetRegistered.ts";
import type { RegisterNewPet } from "./RegisterNewPet.ts";
import type { RenamePet } from "./RenamePet.ts";

type PetCommands = RegisterNewPet | RenamePet;

type PetEvents = PetRegistered | PetRenamed;

export class Pet extends Entity<PetEvents, PetState, PetCommands>() {
  execute(command: PetCommands) {
    switch (command.type) {
      case "RegisterNewPet":
        this.registerNewPet(command);
        break;
      case "RenamePet":
        this.renamePet(command);
        break;
      default:
        const _exhaustiveCheck: never = command;
        throw new Error(`Unhandled command: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }

  private registerNewPet(command: RegisterNewPet) {
    const event = new PetRegistered({ id: Id.generate(), name: command.props.name });

    this.appendEvent(event);
  }

  private renamePet(command: RenamePet) {
    const event = new PetRenamed({ id: command.props.id, name: command.props.name });

    this.appendEvent(event);
  }
}

class PetState extends EntityState(
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
  }),
) {
  get entityId() {
    return this.props?.id;
  }

  apply(event: PetEvents) {
    switch (event.type) {
      case "PetRegistered":
        this.registered(event);
        break;
      case "PetRenamed":
        this.renamed(event);
        break;
      default:
        const _exhaustiveCheck: never = event;
        throw new Error(`Unhandled event: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }

  private registered(event: PetRegistered) {
    this.fillProps({
      id: event.props.id,
      name: event.props.name,
    });
  }

  private renamed(event: PetRenamed) {
    if (!this.initialized()) {
      throw new Error("Entity is not initialized"); // TODO: custom error
    }

    this.props.name = event.props.name;
  }
}
