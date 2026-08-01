import { Id } from "./Id.ts";
import { Name } from "./Name.ts";
import { EntityState } from "../../../foundation/domain/EntityState.ts";
import { z } from "zod";
import { Entity } from "../../../foundation/domain/Entity.ts";
import type { PetRenamed } from "./PetRenamed.ts";
import type { PetRegistered } from "./PetRegistered.ts";

type PetEvents = PetRegistered | PetRenamed;

export class Pet extends Entity<PetEvents, PetState>() {}

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

  public registered(event: PetRegistered) {
    this.fillProps({
      id: event.props.id,
      name: event.props.name,
    });
  }

  public renamed(event: PetRenamed) {
    if (!this.initialized()) {
      throw new Error("Entity is not initialized"); // TODO: custom error
    }

    if (this.props.id.equals(event.props.id)) {
      this.props.name = event.props.name;
    }
  }
}
