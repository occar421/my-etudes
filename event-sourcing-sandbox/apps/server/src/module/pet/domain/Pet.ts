import { Id } from "./Id.ts";
import { Name } from "./Name.ts";
import { EntityState } from "../../../foundation/domain/EntityState.ts";
import { z } from "zod";
import { Entity } from "../../../foundation/domain/Entity.ts";
import type { PetRenamed } from "./PetRenamed.ts";

type PetEvents = PetRenamed;

export class Pet extends Entity<PetEvents, PetState>() {}

class PetState extends EntityState(
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
    category: z.unknown(),
    photos: z.unknown(),
    tags: z.unknown(),
    status: z.unknown(),
  }),
) {
  get id() {
    return this.props.id;
  }

  apply(event: PetEvents) {
    switch (event.type) {
      case "PetRenamed":
        if (this.props.id.equals(event.props.id)) {
          this.props.name = event.props.name;
        }
        break;
    }
  }
}
