#!/usr/bin/python3
from diy_app.models import db, Post, Comment
from flask import request, jsonify, current_app
from diy_app.models.user import User
from . import app_routes  # Import the blueprint directly
import jwt

# Endpoint to sign up a user
@app_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    fullname = data.get('fullname')
    email = data.get('email')
    pwd = data.get('pwd')

    existing_user = User.query.filter((User.email == email)).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(fullname=fullname, email=email, pwd=pwd)
    new_user.set_password(pwd)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Endpoint to login user
@app_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    pwd = data.get('pwd')

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    # Check if user exists and password is correct
    if user and user.check_password(pwd):
        # Generate JWT token with user's ID as payload
        token = jwt.encode({'user_id': user.id}, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

# Endpoint to logout user
@app_routes.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logout successful'}), 200

# Endpoint to like/unlike a post
@app_routes.route('/like', methods=['POST'])
def like_post(post_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authorization token is missing'}), 401

    try:
        user_id = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])['user_id']
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if user in post.likes:
        post.likes.remove(user)
        db.session.commit()
        return jsonify({'message': 'Post unliked successfully'}), 200
    else:
        post.likes.append(user)
        db.session.commit()
        return jsonify({'message': 'Post liked successfully'}), 200

# Endpoint to save/unsave a post
@app_routes.route('/save', methods=['POST'])
def save_post(post_id):
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'Authorization token is missing'}), 401

    try:
        user_id = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])['user_id']
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return jsonify({'error': 'Invalid or expired token'}), 401

    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if user in post.saved_by:
        post.saved_by.remove(user)
        message = 'Unsaved successfully'
    else:
        post.saved_by.append(user)
        message = 'Saved successfully'

    db.session.commit()
    return jsonify({'message': message}), 200

# Endpoint to get comments for a post
@app_routes.route('/comments', methods=['GET'])
def get_comments(post_id):
    post = Post.query.get_or_404(post_id)
    comments = post.comments.all()
    return jsonify({'comments': [comment.serialize() for comment in comments]}), 200

# Endpoint for search and filters
@app_routes.route('/search', methods=['GET'])
def search_posts():
    keyword = request.args.get('keyword')
    category = request.args.get('category')

    if not keyword and not category:
        return jsonify({'error': 'Please provide a keyword or category for search'}), 400

    query = Post.query

    if keyword:
        query = query.filter(Post.title.contains(keyword) | Post.content.contains(keyword))

    if category:
        query = query.filter_by(category=category)

    posts = query.all()
    return jsonify({'posts': [post.serialize() for post in posts]}), 200
