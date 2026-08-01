import { ValueObject } from "./ValueObject";
import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";
import type { DomainEvent } from "./DomainEvent.ts";

export function EntityState<
  S extends ZodType,
  E extends InstanceType<ReturnType<typeof DomainEvent>>,
  PT = z.infer<S>,
>(schema: S) {
  abstract class EntityState_ {
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

    public equals(other: EntityState_): boolean {
      if (!other?.id) {
        return false;
      }

      return this.id.equals(other.id);
    }

    abstract apply(event: E): void; // TODO: event handler map
  }

  return EntityState_;
}
