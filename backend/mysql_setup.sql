-- Connect to MySQL server as a superuser (e.g., root)
-- If the database does not exist, create it
CREATE DATABASE IF NOT EXISTS diy_creative_display;

-- If the user does not exist, create it
CREATE USER IF NOT EXISTS 'diy_cd_user'@'localhost' IDENTIFIED BY 'DIY_cd_pwd3}';

-- Grant privileges to the user for the database
GRANT ALL PRIVILEGES ON diy_creative_display.* TO 'diy_cd_user'@'localhost';

GRANT SELECT ON `performance_schema`.* TO 'diy_cd_user'@'localhost';

FLUSH PRIVILEGES;

-- -- To create Table
-- USE diy_creative_display;

-- CREATE TABLE IF NOT EXISTS users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     fullname VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(60) NOT NULL UNIQUE
-- );

-- CREATE TABLE IF NOT EXISTS posts (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     content TEXT NOT NULL,
--     date_posted DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     categories VARCHAR(100) NOT NULL,
--     picture VARCHAR(255) NOT NULL DEFAULT 'default.jpg',
--     user_id INTEGER NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users (id)
-- );

-- CREATE TABLE IF NOT EXISTS likes (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     user_id INTEGER NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users (id),
--     post_id INTEGER NOT NULL,
--     FOREIGN KEY (post_id) REFERENCES posts (id)
-- );

-- Flush privileges to apply changes


Exit;

