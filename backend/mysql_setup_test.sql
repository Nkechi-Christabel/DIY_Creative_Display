#!/usr/bin/python3
import unittest
import mysql.connector

class TestMySQLSetup(unittest.TestCase):
    def setUp(self):
        # Establish connection to MySQL
        self.connection = mysql.connector.connect(
            host='localhost',
            user='root',  # Assuming root user for testing purposes
            password='',  # No password yet
            charset='utf8mb4',
        )

    def test_database_creation(self):
        # Check if the database is created successfully
        cursor = self.connection.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS diy_creative_display")
        cursor.execute("SHOW DATABASES")
        databases = [db[0] for db in cursor.fetchall()]
        self.assertIn('diy_creative_display', databases)
        cursor.close()

    def test_user_creation_and_privileges(self):
        # Check if the user is created and granted privileges
        cursor = self.connection.cursor()
        cursor.execute("CREATE USER IF NOT EXISTS 'diy_cd_user'@'localhost' IDENTIFIED BY 'DIY_cd_pwd3}'")
        cursor.execute("GRANT ALL PRIVILEGES ON diy_creative_display.* TO 'diy_cd_user'@'localhost'")
        cursor.execute("GRANT SELECT ON performance_schema.* TO 'diy_cd_user'@'localhost'")
        cursor.execute("FLUSH PRIVILEGES")
        cursor.execute("SELECT * FROM mysql.user WHERE user = 'diy_cd_user'")
        user = cursor.fetchone()
        self.assertIsNotNone(user)
        self.assertIn('ALL PRIVILEGES', user[3])
        cursor.close()

    def test_table_creation(self):
        # Check if the table 'users' is created successfully
        cursor = self.connection.cursor()
        cursor.execute("USE diy_creative_display")
        cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, username VARCHAR(30) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, pwd VARCHAR(60) NOT NULL UNIQUE)")
        cursor.execute("SHOW TABLES")
        tables = [table[0] for table in cursor.fetchall()]
        self.assertIn('users', tables)
        cursor.close()

    def tearDown(self):
        # Close the connection after each test
        self.connection.close()

if __name__ == '__main__':
    unittest.main()
