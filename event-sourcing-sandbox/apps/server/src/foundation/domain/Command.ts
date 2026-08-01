import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

export function Command<TType extends string, TSchema extends ZodType, TProps = z.infer<TSchema>>(
  type: TType,
  schema: TSchema,
) {
  abstract class Command_ {
    public readonly type: TType = type;
    public readonly props: TProps;

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
  }

  return Command_;
}
