from flask import abort, jsonify, make_response, request
from flask import Blueprint
from v1.Models import db
from v1.Models.user import User
from flask_login import login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

user_info = Blueprint('user_info', __name__)

@user_info.route('/signup', methods=['POST'])
def signup():
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'username' not in request.get_json():
        abort(400, description="Missing username")

    if 'email' not in request.get_json():
        abort(400, description="Missing email")

    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({'error': 'Username or email already exists'}), 400
    
    new_user = User(username=username, email=email, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


@user_info.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if user exists
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid username or password'}), 401

    # Login user
    login_user(user)

    return jsonify({'message': 'Login successful'}), 200

@user_info.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200