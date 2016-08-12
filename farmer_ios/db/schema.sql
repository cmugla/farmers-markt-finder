DROP TABLE IF EXISTS farmers;
CREATE TABLE farmers (
  farmer_id serial unique primary key,
  name VARCHAR(50) unique,
  email VARCHAR(255) unique not null,
  market_id integer,
  password_digest TEXT not null,
  farmer_created timestamp not null default now()
);
CREATE INDEX on farmers (name) ;
CREATE INDEX on farmers (email) ;

DROP TABLE IF EXISTS farmer_posts;
CREATE TABLE farmer_posts (
  post_id serial unique primary key,
  farmer_id integer not null,
  market_id integer not null,
  content TEXT not null,
  post_created timestamp not null default now()
);

DROP TABLE IF EXISTS save_markets;
CREATE TABLE save_markets (
  market_id serial unique primary key,
  farmer_id integer not null,
  market_name VARCHAR(255) not null,
  address_line_1 TEXT not null,
  state VARCHAR(255) not null,
  operation_hours TEXT not null,
  operation_season TEXT not null,
  market_link_url TEXT not null
);
