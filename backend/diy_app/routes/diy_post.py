#!/usr/bin/python3
from flask import jsonify, request
from diy_app.models.post import Post
from . import app_routes
from diy_app.models import db


# Creates a post
@app_routes.route('/create', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    categories = data.get('categories')
    user_id = data.get('user_id')
    picture = data.get('picture')

    new_post = Post(title=title, content=content, categories=categories, user_id=user_id, picture=picture)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'DIY post created successfully'}), 201

# Gets all Posts
@app_routes.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])


# Gets a Post with a specific id
@app_routes.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    diypost = Post.query.get_or_404(post_id)
    return jsonify(diypost.to_dict())



# @app_routes.route('/diyposts/<int:post_id>', methods=['PUT'])
# def update_diypost(post_id):
#     diypost = DIYPost.query.get_or_404(post_id)
#     data = request.get_json()
#     diypost.title = data['title']
#     diypost.content = data['content']
#     db.session.commit()
#     return jsonify({'message': 'DIY post updated successfully'})

# @app_routes.route('/diyposts/<int:post_id>', methods=['DELETE'])
# def delete_diypost(post_id):
#     diypost = DIYPost.query.get_or_404(post_id)
#     db.session.delete(diypost)
#     db.session.commit()
#     return jsonify({'message': 'DIY post deleted successfully'})
