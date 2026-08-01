import { randomUUID, type UUID } from "node:crypto";
import { ValueObject } from "../../../foundation/domain/ValueObject.ts";

export class PetId extends ValueObject<{ value: UUID }> {
  public static generate(): PetId {
    return new PetId({ value: randomUUID() /* FIXME: Should use v7 */ });
  }
}
