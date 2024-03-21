from diy_app.models import db
from flask import request, jsonify, current_app
from diy_app.models.user import User
from . import app_routes  # Import the blueprint directly
import jwt


# Endpoint to sign up a user
@app_routes.route('/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    fullName = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    # id = data.get("id")

    existing_user = User.query.filter((User.email == email)).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(fullName=fullName, email=email, password=password)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
   
    id = new_user.id
    print(id)

    return jsonify({'message': 'User created successfully', 'fullName': fullName, 'email': email, 'id': id}), 201


# Endpoint to login user
@app_routes.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    # Check if user exists and password is correct
    if user and user.check_password(password):
        # Generate JWT token with user's ID as payload
        token = jwt.encode({'user_id': user.id}, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token, 'email': email}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401


# Endpoint to logout user
@app_routes.route('/auth/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logout successful'}), 200


# Gets all users
@app_routes.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()

        users_data = [{
            'id': user.id,
            'fullName': user.fullName,
            'email': user.email,
            "date_joined": user.date_joined,
          
        } for user in users]

        return jsonify(users_data)
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'error': 'Failed to retrieve user data'}), 500
