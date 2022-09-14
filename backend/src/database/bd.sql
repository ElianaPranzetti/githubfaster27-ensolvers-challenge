CREATE DATABASE notesdb

CREATE TABLE note(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    description VARCHAR(255),
    isarchived  BOOLEAN
);