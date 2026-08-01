import { Id } from "./Id.ts";
import { Name } from "./Name.ts";
import { DomainEvent } from "../../../foundation/domain/DomainEvent.ts";
import { z } from "zod";

export class PetRenamed extends DomainEvent(
  "PetRenamed",
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
  }),
) {}
