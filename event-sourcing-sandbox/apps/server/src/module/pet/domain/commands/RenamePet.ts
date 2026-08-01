import { Command } from "@/domain/Command.ts";
import { z } from "zod";
import { Id } from "../Id.ts";
import { Name } from "../Name.ts";

export class RenamePet extends Command(
  "RenamePet",
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
    // TODO: by(user)
  }),
) {}
