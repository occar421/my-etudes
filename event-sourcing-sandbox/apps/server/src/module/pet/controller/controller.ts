import { Hono } from "hono";
import { RegisterPet } from "../usecase/RegisterPet.ts";
import * as console from "node:console";
import { Name } from "../domain/Name.ts";

export function petController(): Hono {
  const app = new Hono();

  const petRepo = {
    async save(pet: unknown) {
      // TODO: save events to DB
      console.log(pet);
    },
  };

  app.post("/pets", async (c) => {
    const body = await c.req.json();
    const nameVar = body.name;
    if (nameVar === undefined) {
      return c.json({ error: "name is required" }, 400);
    }

    let name: Name;
    try {
      name = new Name({ value: nameVar });
    } catch (error: unknown) {
      return c.json({ error: error }, 400);
    }

    const usecase = new RegisterPet(petRepo);
    const response = await usecase.execute({ name });

    return c.json({ id: response.id.rawValue });
  });

  return app;
}
