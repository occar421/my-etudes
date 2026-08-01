import { Id } from "./../Id.ts";
import { Name } from "./../Name.ts";
import { DomainEvent } from "@/domain/DomainEvent.ts";
import { z } from "zod";

export class PetRegistered extends DomainEvent(
  "PetRegistered",
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
  }),
) {}
