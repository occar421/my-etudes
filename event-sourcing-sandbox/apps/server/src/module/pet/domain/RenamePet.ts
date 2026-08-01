import { Command } from "../../../foundation/domain/Command.ts";
import { z } from "zod";
import { Name } from "./Name.ts";

export class RenamePet extends Command(
  "RenamePet",
  z.object({
    id: z.instanceof(Id),
    name: z.instanceof(Name),
  }),
) {}
