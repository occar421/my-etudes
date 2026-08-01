import type { DomainEvent } from "./DomainEvent.ts";
import type { EntityState } from "./EntityState.ts";
import type { Command } from "./Command.ts";

export function Entity<
  C extends InstanceType<ReturnType<typeof Command>>,
  E extends InstanceType<ReturnType<typeof DomainEvent>>,
  SC extends new () => InstanceType<ReturnType<typeof EntityState>>,
>(SCtor: SC) {
  type S = InstanceType<SC>;

  abstract class Entity_ {
    private events: E[] = [];
    protected state: S;

    public constructor(events: E[], initialState = new SCtor() as S) {
      this.state = initialState;
      for (const event of events) {
        this.appendEvent(event);
      }
    }

    protected appendEvent(event: E) {
      this.events.push(event);
      this.state.apply(event);
    }

    public abstract execute(command: C): void;
  }

  return Entity_;
}
