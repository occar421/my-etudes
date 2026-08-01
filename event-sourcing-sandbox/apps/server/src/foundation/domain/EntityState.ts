import { ValueObject } from "./ValueObject";
import { z, ZodError, type ZodType } from "zod";
import { ConstraintError } from "./ConstraintError.ts";
import type { DomainEvent } from "./DomainEvent.ts";

export function EntityState<
  S extends ZodType,
  EH extends {
    [K in InstanceType<ReturnType<typeof DomainEvent>>["type"]]: (
      event: Extract<EEE, { type: K }>,
    ) => void;
  },
  EEE = Parameters<EH[keyof EH]>[0],
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

    public apply(event: InstanceType<ReturnType<typeof DomainEvent>>) {
      const handler = this.eventHandlers[event.type];
      if (handler) {
        (handler as (e: unknown) => void)(event);
      }
    }

    abstract eventHandlers: EH;

    abstract eee(): EEE;
  }

  return EntityState_;
}
