export class User {
  readonly #name: Name;
  readonly #birthday: Birthday;

  private constructor(name: Name, birthday: Birthday) {
    this.#name = name;
    this.#birthday = birthday;
  }

  public get fullName_raw() {
    return this.#name.fullName_raw;
  }

  public get ageOf_raw() {
    return this.#birthday.ageOf_raw;
  }
}

export class Name {
  readonly #firstName: string;
  readonly #lastName: string;

  private constructor(firstName: string, lastName: string) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  static create(firstName: string, lastName: string): Name {
    return new Name(firstName, lastName);
  }

  public get fullName_raw(): string {
    return `${this.#firstName} ${this.#lastName}`;
  }
}

export class Birthday {
  readonly #birthday: Date;

  private constructor(birthday: Date) {
    this.#birthday = birthday;
  }

  static create(birthday: Date) {
    return new Birthday(birthday);
  }

  public ageOf_raw(date: Date): number {
    const diff = date.getTime() - this.#birthday.getTime();
    const ageDate = new Date(diff); // milliseconds from epoch
    return ageDate.getUTCFullYear() - 1970;
  }
}
