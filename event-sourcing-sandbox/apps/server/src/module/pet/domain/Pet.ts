import { PetId } from "./PetId";
import { PetName } from "./PetName.ts";
import { Entity } from "../../../foundation/domain/Entity.ts";

export class Pet extends Entity<{
  id: PetId;
  name: PetName;
  category: unknown;
  photos: unknown;
  tags: unknown;
  status: unknown;
}>((props) => props.id) {}
