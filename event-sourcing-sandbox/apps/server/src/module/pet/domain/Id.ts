import { randomUUID } from "node:crypto";
import { ValueObject } from "@/domain/ValueObject.ts";
import { z } from "zod";

export class Id extends ValueObject(z.object({ value: z.uuidv7() })) {
  public static generate(): Id {
    return new Id({ value: randomUUID() });
  }
}
