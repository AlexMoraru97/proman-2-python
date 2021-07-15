--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS board_statuses CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS cards;

---
--- create tables
---

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL
);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    user_id     INTEGER,
    title       VARCHAR(200)        NOT NULL
);

CREATE TABLE user_account (
    id          SERIAL PRIMARY KEY  NOT NULL,
    user_name   CHARACTER VARYING(255) UNIQUE NOT NULL,
    password    CHARACTER VARYING(255) UNIQUE NOT NULL
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    status_id   INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

CREATE TABLE board_statuses (
    id      SERIAL PRIMARY KEY NOT NULL,
    board_id INTEGER            NOT NULL,
    status_id INTEGER           NOT NULL
);

---
--- insert data
---

INSERT INTO statuses(title) VALUES ('new');
INSERT INTO statuses(title) VALUES ('in progress');
INSERT INTO statuses(title) VALUES ('testing');
INSERT INTO statuses(title) VALUES ('done');

INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');

INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 1, 1);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 1, 2);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 1, 3);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 1, 4);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 2, 1);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 2, 2);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 2, 3);
INSERT INTO board_statuses VALUES (nextval('board_statuses_id_seq'), 2, 4);

INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 1 board 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 1, 'new card 2 board 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 2, 'in progress card board 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 3, 'planning card board 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 1 board 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 4, 'done card 2 board 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 1, 'new card 1 board 2', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 1, 'new card 2 board 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 2, 'in progress card board 2', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 3, 'planning card board 2', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 4, 'done card 1 board 2', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 4, 'done card 2 board 2', 2);


---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_boards_user_id FOREIGN KEY (user_id) REFERENCES user_account(id);

ALTER TABLE ONLY board_statuses
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY board_statuses
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);