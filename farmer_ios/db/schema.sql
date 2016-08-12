DROP TABLE IF EXISTS farmers;
CREATE TABLE farmers (
  farmer_id serial unique primary key,
  name VARCHAR(50) unique,
  email VARCHAR(255) unique not null,
  market_name VARCHAR(255),
  password_digest TEXT not null,
  farmer_created timestamp not null default now()
);
CREATE INDEX on farmers (name) ;
CREATE INDEX on farmers (email) ;

DROP TABLE IF EXISTS farmer_posts;
CREATE TABLE farmer_posts (
  post_id serial unique primary key,
  farmer_id serial not null,
  market_id serial not null,
  content TEXT not null,
  post_created timestamp not null default now()
)
