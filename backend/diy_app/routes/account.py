#!/usr/bin/python3
from diy_app.models import db
from flask import request, jsonify
from diy_app.models.user import User
from . import app_routes  # Import the blueprint directly
from flask_login import login_user, logout_user

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
    username = data.get('username')
    pwd = data.get('pwd')

    # Check if user exists
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(pwd):
        return jsonify({'error': 'Invalid username or password'}), 401

    # Login user
    login_user(user)

    return jsonify({'message': 'Login successful'}), 200

# Endpoint to logout user
@app_routes.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200
