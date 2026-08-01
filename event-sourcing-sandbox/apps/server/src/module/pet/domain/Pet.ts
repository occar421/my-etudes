import { Id } from "./Id.ts";
import { Name } from "./Name.ts";
import { EntityState } from "../../../foundation/domain/EntityState.ts";
import { z } from "zod";
import { Entity } from "../../../foundation/domain/Entity.ts";
import { PetRenamed } from "./PetRenamed.ts";
import { PetRegistered } from "./PetRegistered.ts";

type PetEvent = PetRenamed | PetRegistered;

export class Pet extends Entity<PetEvent, PetState>() {}

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
  get entityId() {
    const a = this.eee();
    
    return this.props.id;
  }

  // apply(event: PetEvent) {
  //   switch (event.type) {
  //     case "PetRenamed":
  //       if (this.props.id.equals(event.props.id)) {
  //         this.props.name = event.props.name;
  //       }
  //       break;
  //     case "PetRegistered":
  //       this.props.id = event.props.id;
  //       this.props.name = event.props.name;
  //       break;
  //   }
  // }

  eventHandlers = {
    PetRenamed: (e: PetRenamed) => {
      console.log("Pet renamed", e);
    },
    PetRegistered: (e: PetRegistered) => {
      console.log("Pet registered", e);
    },
  };
}
