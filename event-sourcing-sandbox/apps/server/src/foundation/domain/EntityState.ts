import { ValueObject } from "./ValueObject";
import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";
import type { DomainEvent } from "./DomainEvent.ts";

export function EntityState<
  TState extends ZodType,
  TEvent extends InstanceType<ReturnType<typeof DomainEvent>>,
  TProps = z.infer<TState>,
>(stateSchema: TState) {
  abstract class EntityState_ {
    protected props?: TProps;
    public initialized(): this is this & { props: TProps } {
      return this.props !== undefined;
    }

    abstract get entityId(): InstanceType<ReturnType<typeof ValueObject>> | undefined;

    public constructor(props?: TProps, force: boolean = false) {
      if (props === undefined) {
        this.props = undefined;
        return;
      }

      this.fillProps(props, force);
    }

    protected fillProps(props: TProps, force: boolean = false) {
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

    protected static get schema(): TState {
      return stateSchema;
    }

    public equals(other: EntityState_): boolean {
      if (!other?.entityId) {
        return false;
      }

      return this.entityId?.equals(other.entityId) ?? false;
    }

    public abstract apply(event: TEvent): void;
  }

  return EntityState_;
}
