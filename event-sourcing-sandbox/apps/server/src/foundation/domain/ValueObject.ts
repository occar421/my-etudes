import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */
export function ValueObject<TSchema extends ZodType, TProps = z.infer<TSchema>>(schema: TSchema) {
  abstract class ValueObject_ {
    protected props: TProps;

    public constructor(props: TProps, force: boolean = false) {
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

    protected static get schema(): TSchema {
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
