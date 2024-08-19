from flask import jsonify, request
from diy_app.models.post import Post
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
        post_data = post.to_dict()
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
        post_data = post.to_dict()
        posts_data.append(post_data)


    return jsonify(posts_data), 200