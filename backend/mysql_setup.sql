-- Connect to MySQL server as a superuser (e.g., root)
-- If the database does not exist, create it
CREATE DATABASE IF NOT EXISTS diy_creative_display;

-- If the user does not exist, create it
CREATE USER IF NOT EXISTS 'diy_cd_user'@'localhost' IDENTIFIED BY 'DIY_cd_pwd3}';

-- Grant privileges to the user for the database
GRANT ALL PRIVILEGES ON diy_creative_display.* TO 'diy_cd_user'@'localhost';

GRANT SELECT ON `performance_schema`.* TO 'diy_cd_user'@'localhost';

FLUSH PRIVILEGES;
-- Flush privileges to apply changes


Exit;