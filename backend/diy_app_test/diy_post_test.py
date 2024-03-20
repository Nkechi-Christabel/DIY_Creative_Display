import sys
import os
# Add the parent directory of diy_app to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from diy_app.app import create_app
from diy_app.models import db
import json
from werkzeug.datastructures import FileStorage
from diy_app.models.post import Post

class TestFlaskApp(unittest.TestCase):
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


    def test_Post(self):
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

        token = response_data['token']

        #TESTING POST
        file_path = '/mnt/c/Users/banwy/OneDrive/Desktop/Bikes.jpg'
        file_path2 = '/mnt/c/Users/banwy/OneDrive/Desktop/download.jpg'

        with open(file_path, 'rb') as file1, open(file_path2, 'rb') as file2:
            image_file1 = FileStorage(filename='Bikes.jpg', stream=file1)
            image_file2 = FileStorage(filename='download.jpg', stream=file2)
            image_files = [image_file1, image_file2]

            post_data = {
                "title": "DIY Project Title",
                "content": "This is the content of the DIY project.",
                "categories": "Tech",
                "photos": image_files
            }

            response = self.app.post('/post', data=post_data, headers={'Authorization': token}, content_type='multipart/form-data')
            self.assertEqual(response.status_code, 201)

        app = create_app()
        with app.app_context():
            post = Post.query.first()
            self.assertIsNotNone(post)
            self.assertEqual(post.title, 'DIY Project Title')
            self.assertEqual(post.content, 'This is the content of the DIY project.')
            self.assertEqual(post.categories, 'Tech')


    def test_post_CRUD(self):
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

        response_data = response.get_json()

        token = response_data['token']

        #TESTING POST
        file_path = '/mnt/c/Users/banwy/OneDrive/Desktop/Bikes.jpg'
        file_path2 = '/mnt/c/Users/banwy/OneDrive/Desktop/download.jpg'

        # Adding Post 1
        with open(file_path, 'rb') as file1, open(file_path2, 'rb') as file2:
            image_file1 = FileStorage(filename='Bikes.jpg', stream=file1)
            image_file2 = FileStorage(filename='download.jpg', stream=file2)
            image_files = [image_file1, image_file2]

            post_data = {
                "title": "DIY Project Title",
                "content": "This is the content of the DIY project.",
                "categories": "Tech",
                "photos": image_files
            }

            response = self.app.post('/post', data=post_data, headers={'Authorization': token}, content_type='multipart/form-data')
            self.assertEqual(response.status_code, 201)

        # Adding Post 2
        with open(file_path, 'rb') as file1, open(file_path2, 'rb') as file2:
            image_file = FileStorage(filename='Bikes.jpg', stream=file1)

            post_data = {
                "title": "2nd_DIY Project Title",
                "content": "2nd_This is the content of the DIY project.",
                "categories": "2nd_Tech",
                "photos": image_file
            }

            response = self.app.post('/post', data=post_data, headers={'Authorization': token}, content_type='multipart/form-data')
            self.assertEqual(response.status_code, 201)

        # Getting a specific post
        response = self.app.get('/post/1')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()

        self.assertIn('title', response_data)
        self.assertIn('content', response_data)
        self.assertIn('categories', response_data)
        self.assertIn('date_posted', response_data)
            
        # Get all Post
        response2 = self.app.get('/posts')
        self.assertEqual(response2.status_code, 200)
        response_data2 = response2.get_json()

        self.assertIn('title', response_data2[0])
        self.assertIn('content', response_data2[0])
        self.assertIn('categories', response_data2[0])
        self.assertIn('date_posted', response_data2[0])

        #Update Post
        post_data = {
                "title": "DIY Project Book",
                "content": "This is the content of the DIY project.",
                "categories": "Book",
            }

        response = self.app.put('/post/1', data=post_data, headers={'Authorization': token}, content_type='multipart/form-data')
        self.assertEqual(response.status_code, 201)

        app = create_app()
        with app.app_context():
            post = Post.query.first()
            self.assertIsNotNone(post)
            self.assertEqual(post.title, 'DIY Project Book')
            self.assertEqual(post.content, 'This is the content of the DIY project.')
            self.assertEqual(post.categories, 'Book')


        # Delete Post
        response3 = self.app.delete('/post/1', headers={'Authorization': token})
        self.assertEqual(response3.status_code, 200)
        response_data = response3.get_json()
        self.assertEqual(response_data['message'], 'Post deleted successfully')


if __name__ == '__main__':
    unittest.main()