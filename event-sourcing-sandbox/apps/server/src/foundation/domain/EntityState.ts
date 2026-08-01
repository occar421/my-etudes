import { ValueObject } from "./ValueObject";
import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";
import type { DomainEvent } from "./DomainEvent.ts";

export function EntityState<
  S extends ZodType,
  E extends InstanceType<ReturnType<typeof DomainEvent>>,
  PT = z.infer<S>,
>(stateSchema: S) {
  abstract class EntityState_ {
    protected props: PT;

    abstract get entityId(): InstanceType<ReturnType<typeof ValueObject>>;

    public constructor(props: PT, force: boolean = false) {
      if (!force) {
        try {
          stateSchema.parse(props);
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
      return stateSchema;
    }

    public equals(other: EntityState_): boolean {
      if (!other?.entityId) {
        return false;
      }

      return this.entityId.equals(other.entityId);
    }

    abstract apply(event: E): void;
  }

  return EntityState_;
}
