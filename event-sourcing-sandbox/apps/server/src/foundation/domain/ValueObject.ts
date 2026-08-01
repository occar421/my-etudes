import { z, ZodError, type ZodObject } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */
export function ValueObject<S extends ZodObject, PT = z.infer<S>>(schema: S) {
  return class ValueObject {
    protected props: PT;

    protected constructor(props: PT) {
      this.props = { ...props };
    }

    protected static get schema(): S {
      return schema;
    }

    public static reconstruct<Clazz extends { prototype: unknown }, Inst = Clazz["prototype"]>(
      this: Clazz,
      props: PT,
    ): Inst {
      try {
        schema.parse(props);
        return new (this as unknown as new (props: PT) => Inst)(props);
      } catch (e: unknown) {
        if (e instanceof ZodError) {
          throw new ConstraintError(e);
        }
        throw e;
      }
    }

    public static safeReconstruct<Clazz extends { prototype: unknown }, Inst = Clazz["prototype"]>(
      this: Clazz,
      props: PT,
    ): { success: true; data: Inst } | { success: false; error: ConstraintError } {
      const result = schema.safeParse(props);
      if (result.success) {
        return { success: true, data: new (this as unknown as new (props: PT) => Inst)(props) };
      } else {
        return { success: false, error: new ConstraintError(result.error) };
      }
    }

    public equals(vo?: ValueObject): boolean {
      if (!vo?.props) {
        return false;
      }

      return JSON.stringify(this) === JSON.stringify(vo);
    }
  };
}
