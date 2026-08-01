import { Id } from "./Id.ts";
import { Name } from "./Name.ts";
import { Entity } from "@/domain/Entity.ts";
import { EntityState } from "@/domain/EntityState.ts";
import { z } from "zod";
import { PetRenamed } from "./events/PetRenamed.ts";
import { PetRegistered } from "./events/PetRegistered.ts";
import type { RegisterPet } from "./commands/RegisterPet.ts";
import type { RenamePet } from "./commands/RenamePet.ts";

type PetCommands = RegisterPet | RenamePet;

type PetEvents = PetRegistered | PetRenamed;

export class Pet extends Entity<PetCommands, PetState, PetEvents>() {
  public execute(command: PetCommands) {
    switch (command.type) {
      case "RegisterPet":
        this.registerPet(command);
        break;
      case "RenamePet":
        this.renamePet(command);
        break;
      default:
        const _exhaustiveCheck: never = command;
        throw new Error(`Unhandled command: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }

  private registerPet(command: RegisterPet) {
    const event = new PetRegistered({ id: Id.generate(), name: command.props.name });

    this.appendEvent(event);
  }

  private renamePet(command: RenamePet) {
    const event = new PetRenamed({ id: command.props.id, name: command.props.name });

    this.appendEvent(event);
  }
}

export class PetState extends EntityState(
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
  }),
) {
  get entityId() {
    return this.props?.id;
  }

  public apply(event: PetEvents) {
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
