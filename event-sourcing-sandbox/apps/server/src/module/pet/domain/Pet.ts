import type { PetId } from "./PetId";
import type { PetName } from "./PetName.ts";

export class Pet {
  private value: {
    id: PetId;
    name: PetName;
    category: unknown;
    photos: unknown;
    tags: unknown;
    status: unknown;
  };

  private constructor(args: Pet["value"]) {
    this.value = args;
  }

  // public function rename() {}

  public static reconstruct(args: Pet["value"]): Pet {
    return new Pet(args);
  }
}
