#!/usr/bin/python3
from diy_app.extensions import db
from flask import request, jsonify
from diy_app.models.user import User
from . import app_routes  # Import the blueprint directly

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
