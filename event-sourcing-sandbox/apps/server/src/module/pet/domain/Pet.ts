import { PetId } from "./PetId";
import { PetName } from "./PetName.ts";
import { Entity } from "../../../foundation/domain/Entity.ts";
import { z } from "zod";

export class Pet extends Entity(
  z.object({
    id: z.instanceof(PetId),
    name: z.instanceof(PetName),
    category: z.unknown(),
    photos: z.unknown(),
    tags: z.unknown(),
    status: z.unknown(),
  }),
) {
  get id() {
    return this.props.id;
  }
}
