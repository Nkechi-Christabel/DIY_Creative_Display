from flask import jsonify, request
from diy_app.models.post import Post
from diy_app.routes.diy_post import photos
from . import app_routes
import json

# Endpoint to Search For post
@app_routes.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    keyword = data.get('keyword')

    posts = Post.query.filter(Post.title.contains(keyword) | Post.content.contains(keyword)).all()

    if not posts:
        return jsonify({'Message': 'Not Found'}), 404
    
    posts_data = []

    for post in posts:
        # Parse the JSON string stored in the image_filenames field into a list of filenames
        image_filenames = json.loads(post.image_filenames)

        # Create URLs for accessing the images based on the filenames
        image_urls = [photos.url(filename) for filename in image_filenames]

        post_data = post.to_dict()
        post_data['image_urls'] = image_urls

        posts_data.append(post_data)

    return jsonify(posts_data), 200


# Endpoint for filter by Categories
@app_routes.route('/filter', methods=['POST'])
def filter():
    data = request.get_json()
    categories = data.get('categories')

    posts = Post.query.filter_by(categories=categories).all()

    if not posts:
        return jsonify({'Message': 'Not Found'}), 404
    
    posts_data = []

    for post in posts:
        # Parse the JSON string stored in the image_filenames field into a list of filenames
        image_filenames = json.loads(post.image_filenames)

        # Create URLs for accessing the images based on the filenames
        image_urls = [photos.url(filename) for filename in image_filenames]

        post_data = post.to_dict()
        post_data['image_urls'] = image_urls

        posts_data.append(post_data)

    return jsonify(posts_data), 200