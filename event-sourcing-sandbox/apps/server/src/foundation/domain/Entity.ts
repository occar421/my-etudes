import type { DomainEvent } from "./DomainEvent.ts";
import type { EntityState } from "./EntityState.ts";
import type { Command } from "./Command.ts";

export function Entity<
  E extends InstanceType<ReturnType<typeof DomainEvent>>,
  S extends InstanceType<ReturnType<typeof EntityState>>,
  C extends InstanceType<ReturnType<typeof Command>>,
>() {
  abstract class Entity_ {
    private events: E[] = [];
    protected state: S;

    public constructor(events: E[], initialState: S) {
      this.state = initialState;
      for (const event of events) {
        this.appendEvent(event);
      }
    }

    protected appendEvent(event: E) {
      this.events.push(event);
      this.state.apply(event);
    }

    abstract execute(command: C): void;
  }

  return Entity_;
}
