import { Command } from "@/domain/Command.ts";
import { z } from "zod";
import { Name } from "../Name.ts";

export class RegisterPet extends Command(
  "RegisterPet",
  z.object({
    name: z.instanceof(Name),
  }),
) {
  public static with(name: Name) {
    return new this({ name });
  }
}
