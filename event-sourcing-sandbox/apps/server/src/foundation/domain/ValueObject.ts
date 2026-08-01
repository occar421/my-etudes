import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */
export function ValueObject<S extends ZodType, PT = z.infer<S>>(schema: S) {
  abstract class ValueObject_ {
    protected props: PT;

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

    public equals(vo?: ValueObject_): boolean {
      if (!vo?.props) {
        return false;
      }

      return JSON.stringify(this) === JSON.stringify(vo);
    }
  }

  return ValueObject_;
}
