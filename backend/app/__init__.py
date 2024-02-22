#!/usr/bin/python3
from flask import Flask
from app.extensions import db  # Import db from extensions.py
from app.config import SECRET_KEY, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME
import os

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqldb://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)  # Initialize db with the Flask app

    # Import and register blueprints
    from app.routes import app_routes
    app.register_blueprint(app_routes)

    print("Connection string",  app.config['SQLALCHEMY_DATABASE_URI'])

    return app

if __name__ == "__main__":
    app = create_app()
    HOST = os.getenv('FLASK_HOST', '0.0.0.0') 
    PORT = int(os.getenv('FLASK_PORT', 5000)) 

    app.run(host=HOST, port=PORT)