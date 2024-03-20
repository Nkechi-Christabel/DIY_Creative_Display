import sys
import os
# Add the parent directory of diy_app to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from diy_app.app import create_app
from diy_app.models import db
import json

class TestAccountRoute(unittest.TestCase):
    def setUp(self):
        # Set up Flask app in test mode
        app = create_app()
        app.config['TESTING'] = True
        self.app = app.test_client()

        # Create test database
        with app.app_context():
            db.create_all()

    def tearDown(self):
        # Clean up test database
        with self.app.application.app_context():
            db.session.remove()
            db.drop_all()

    def testSignUp(self):
        # Create a list of dictionaries
        data = {
            'fullName': 'John Doe',
            'email': 'johndoe@gmail.com',
            'password': 'johndoe123'
        }

        # # Convert dictionary into Json
        json_data = json.dumps(data)

        # Send the POST request with the JSON data
        response = self.app.post('/auth/signup', headers={'Content-Type': 'application/json'}, data=json_data)
        self.assertEqual(response.status_code, 201)

        # Extract data from the response
        response_data = response.get_json()
        self.assertEqual(response_data['message'], 'User created successfully')


    def testlogin(self):
        data = {
            'fullName': 'John Doe',
            'email': 'johndoe@gmail.com',
            'password': 'johndoe123'
        }

        json_data = json.dumps(data)

        response = self.app.post('/auth/signup', headers={'Content-Type': 'application/json'}, data=json_data)
        self.assertEqual(response.status_code, 201)

        response = self.app.post('/auth/login', headers={'Content-Type': 'application/json'}, data=json_data)
        self.assertEqual(response.status_code, 200)

        # Extract data from the response
        response_data = response.get_json()

        # Now you can access the data returned by the server
        self.assertIn('token', response_data)
