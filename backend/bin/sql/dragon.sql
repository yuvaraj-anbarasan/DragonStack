CREATE TABLE dragon(
    id             SERIAL PRIMARY KEY,
    bithdate       TIMESTAMP NOT NULL,
    nickname       varchar(70),
    "generationId" INTEGER,
    FOREIGN KEY ("generationId") REFERENCES generation(id)
);
