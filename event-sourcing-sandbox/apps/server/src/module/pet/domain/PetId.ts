import { randomUUID } from "node:crypto";
import { ValueObject } from "../../../foundation/domain/ValueObject.ts";
import { z } from "zod";

export class PetId extends ValueObject(z.object({ value: z.uuidv7() })) {
  public static generate(): PetId {
    return new PetId({ value: randomUUID() });
  }
}
