#!/usr/bin/python3
from diy_app.models import db
from flask import request, jsonify, current_app
from diy_app.models.user import User
from . import app_routes  # Import the blueprint directly
import jwt

# Endpoint to sign up a user
@app_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    pwd = data.get('pwd')

    new_user = User(name=name, username=username, email=email, pwd=pwd)
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
