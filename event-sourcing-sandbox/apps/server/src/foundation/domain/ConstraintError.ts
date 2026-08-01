import type { ZodError } from "zod";

export class ConstraintError extends Error {
  private zodError: ZodError;

  constructor(error: ZodError) {
    super("");
    this.zodError = error;
    this.name = "ConstraintError";
  }
}
