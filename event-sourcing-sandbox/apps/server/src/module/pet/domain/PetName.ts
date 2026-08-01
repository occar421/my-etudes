import { ValueObject } from "../../../foundation/domain/ValueObject.ts";
import { z } from "zod";

export class PetName extends ValueObject(z.object({ value: z.string().min(1).max(100) })) {}
