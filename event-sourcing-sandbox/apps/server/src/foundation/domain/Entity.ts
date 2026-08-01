import type { DomainEvent } from "./DomainEvent.ts";
import type { EntityState } from "./EntityState.ts";

export function Entity<
  E extends InstanceType<ReturnType<typeof DomainEvent>>,
  S extends InstanceType<ReturnType<typeof EntityState>>,
>() {
  abstract class Entity_ {
    private events: E[] = [];
    private state: S;

    public constructor(events: E[], initialState: S) {
      this.state = initialState;
      for (const event of events) {
        this.events.push(event);
        this.state.apply(event);
      }
    }
  }

  return Entity_;
}
