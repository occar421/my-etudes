import { ValueObject } from "./ValueObject";
import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";

export function Entity<S extends ZodType, PT = z.infer<S>>(schema: S) {
  abstract class Entity {
    protected props: PT;

    abstract get id(): InstanceType<ReturnType<typeof ValueObject>>;

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

    public equals(other: Entity): boolean {
      if (!other?.id) {
        return false;
      }

      return this.id.equals(other.id);
    }
  }

  return Entity;
}
