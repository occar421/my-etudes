/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */
export abstract class ValueObject<T extends { [index: string]: unknown }> {
  protected props: T;

  protected constructor(props: T) {
    this.props = { ...props };
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (!vo?.props) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }
}
