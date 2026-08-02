-- name: CreatePet :exec
INSERT INTO pet (id, name)
VALUES ($1, $2);
