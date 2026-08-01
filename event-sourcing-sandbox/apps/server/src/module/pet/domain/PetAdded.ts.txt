import type { PetId } from "./PetId.ts";
import type { PetName } from "./PetName.ts";

export default class PetAdded {
  private id: PetId;
  private name: PetName;
  private category: unknown;
  private photos: unknown;
  private tags: unknown;
  private status: unknown;
  private created_at: unknown;
  private created_by: unknown;
}
