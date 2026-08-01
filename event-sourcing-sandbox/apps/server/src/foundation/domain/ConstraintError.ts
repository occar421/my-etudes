import type { ZodError } from "zod";

// TODO: custom error "code" on each domain objects

export class ConstraintError extends Error {
  name = "ConstraintError";

  constructor(_error: ZodError) {
    super("");
  }
}
