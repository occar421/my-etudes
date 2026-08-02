import { ValueObject } from "@/domain/ValueObject.ts";
import { z } from "zod";
import { v7 as uuidV7 } from "uuid";

export class Id extends ValueObject(z.object({ value: z.uuidv7() })) {
  public static generate(): Id {
    return new Id({ value: uuidV7() });
  }

  public get rawValue(): string {
    return this.props.value;
  }
}
