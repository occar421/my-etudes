import type { ZodError } from "zod";

// TODO: custom error "code" on each domain objects

export class ConstraintError extends Error {
  private zodError: ZodError;

  constructor(error: ZodError) {
    super("");
    this.zodError = error;
    this.name = "ConstraintError";
  }
}
