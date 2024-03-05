from flask import jsonify, request
from diy_app.models.post import Post
from . import app_routes

# Endpoint to Search For post
@app_routes.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    keyword = data.get('keyword')

    posts = Post.query.filter(Post.title.contains(keyword) | Post.content.contains(keyword)).all()

    if posts:
        post_found = [post.to_dict() for post in posts]
        return jsonify(post_found), 200
    else:
        return jsonify({'Message': 'Not Found'}), 404


# Endpoint for filter by Categories
@app_routes.route('/filter', methods=['POST'])
def filter():
    data = request.get_json()
    filter = data.get('filter')

    posts = Post.query.filter_by(categories=filter).all()

    if posts:
        post_found = [post.to_dict() for post in posts]
        return jsonify(post_found), 200
    else:
        return jsonify({'Message': 'Not Found'}), 404