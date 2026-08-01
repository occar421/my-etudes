import type { EntityState } from "./EntityState.ts";
import type { Command } from "./Command.ts";

export function Entity<
  TCommand extends InstanceType<ReturnType<typeof Command>>,
  TStateCtor extends new () => InstanceType<ReturnType<typeof EntityState>>,
>(SCtor: TStateCtor) {
  type S = InstanceType<TStateCtor>;
  type E = Parameters<S["apply"]>[0];

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

    public abstract execute(command: TCommand): void;
  }

  return Entity_;
}
