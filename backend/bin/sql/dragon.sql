CREATE TABLE dragon(
    id             SERIAL PRIMARY KEY,
    birthdate       TIMESTAMP NOT NULL,
    nickname       varchar(70),
    "generationId" INTEGER,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
);
