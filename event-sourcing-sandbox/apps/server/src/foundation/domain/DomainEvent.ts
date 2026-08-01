import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

export function DomainEvent<T extends string, S extends ZodType, PT = z.infer<S>>(
  type: T,
  schema: S,
) {
  abstract class DomainEvent_ {
    public readonly type: T = type;
    public readonly props: PT;

    public constructor(props: PT, force: boolean = false) {
      if (!force) {
        try {
          schema.parse(props);
        } catch (e: unknown) {
          if (e instanceof ZodError) {
            throw new ConstraintError(e);
          }
          throw e;
        }
      }

      this.props = { ...props };
    }

    protected static get schema(): S {
      return schema;
    }
  }

  return DomainEvent_;
}
