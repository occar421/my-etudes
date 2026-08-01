import { Command } from "@/domain/Command.ts";
import { z } from "zod";
import { Name } from "../Name.ts";

export class RegisterNewPet extends Command(
  "RegisterNewPet",
  z.object({
    name: z.instanceof(Name),
  }),
) {}
