import { ValueObject } from "./ValueObject";

export function Entity<PT extends {}>(
  idSelector: (props: PT) => ReturnType<typeof ValueObject>["prototype"],
) {
  return class Entity {
    protected props: PT;
    protected get id() {
      return idSelector(this.props);
    }

    protected constructor(props: PT) {
      this.props = { ...props };
    }

    public equals(other: Entity): boolean {
      if (!other?.id) {
        return false;
      }

      return this.id.equals(other.id);
    }
  };
}
