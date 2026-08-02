import { Sql } from "postgres";

export const createPetQuery = `-- name: CreatePet :exec
INSERT INTO pet (id, name)
VALUES ($1, $2)`;

export interface CreatePetArgs {
  id: string;
  name: string;
}

export async function createPet(sql: Sql, args: CreatePetArgs): Promise<void> {
  await sql.unsafe(createPetQuery, [args.id, args.name]);
}
