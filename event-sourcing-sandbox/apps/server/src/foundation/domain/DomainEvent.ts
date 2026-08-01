import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

export function DomainEvent<
  TType extends string,
  TSchema extends ZodType,
  TPayload = z.infer<TSchema>,
>(type: TType, schema: TSchema) {
  abstract class DomainEvent_ {
    public readonly type: TType = type;
    public readonly payload: TPayload;
    // TODO: target aggregate, created_at, created_by(system)

    public constructor(payload: TPayload, force: boolean = false) {
      if (!force) {
        try {
          schema.parse(payload);
        } catch (e: unknown) {
          if (e instanceof ZodError) {
            throw new ConstraintError(e);
          }
          throw e;
        }
      }

      this.payload = { ...payload };
    }

    protected static get schema(): TSchema {
      return schema;
    }
  }

  return DomainEvent_;
}
