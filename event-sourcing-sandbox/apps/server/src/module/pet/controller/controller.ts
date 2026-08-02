import { Hono } from "hono";
import { RegisterPet } from "../usecase/RegisterPet.ts";
import * as console from "node:console";
import { Name } from "../domain/Name.ts";
import type { Pet } from "../domain/Pet.ts";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export function petController(): Hono {
  const app = new Hono();

  const petRepo = {
    async save(pet: Pet) {
      // TODO: save events to DB
      console.log(pet.getEventsAfter());
    },
  };

  app.post(
    "/pets",
    zValidator("json", z.object({ name: z.string().min(1).max(100) })),
    async (c) => {
      const body = c.req.valid("json");

      let name: Name;
      try {
        name = new Name({ value: body.name });
      } catch (error: unknown) {
        // TODO: domain error handling
        return c.json({ error: error }, 400);
      }

      const usecase = new RegisterPet(petRepo);
      const response = await usecase.execute({ name });

      return c.json({ id: response.id.rawValue });
    },
  );

  return app;
}
