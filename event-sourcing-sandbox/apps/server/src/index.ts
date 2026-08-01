import { Hono } from "hono";
import { petController } from "./module/pet/controller/controller.ts";

const app = new Hono();

app.route("/", petController());

export default app;

// TODO: domain event dispatcher
// TODO: outbox pattern
