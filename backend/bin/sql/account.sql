CREATE TABLE accounts(
    uid SERIAL PRIMARY KEY,
    username varchar(64),
    password varchar(64),
    "sessionId" VARCHAR(36)
);
