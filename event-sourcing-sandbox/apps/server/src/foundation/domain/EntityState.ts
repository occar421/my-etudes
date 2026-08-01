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
    protected props?: PT;
    public initialized(): this is this & { props: PT } {
      return this.props !== undefined;
    }

    abstract get entityId(): InstanceType<ReturnType<typeof ValueObject>> | undefined;

    public constructor(props?: PT, force: boolean = false) {
      if (props === undefined) {
        this.props = undefined;
        return;
      }

      this.fillProps(props, force);
    }

    protected fillProps(props: PT, force: boolean = false) {
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

      return this.entityId?.equals(other.entityId) ?? false;
    }

    public abstract apply(event: E): void;
  }

  return EntityState_;
}
