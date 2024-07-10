from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from diy_app.models import db  # Import db from extensions.py
# from diy_app.config import SECRET_KEY, DB_USER, DB_PWD, DB_HOST, DB_NAME
from diy_app.models.user import User
from diy_app.models.post import Post
from diy_app.models.likes import Like
from diy_app.models.comment import Comment
from diy_app.models.save import Save
from diy_app.routes.diy_post import configure_file_uploads



load_dotenv()

def create_app():
    app = Flask(__name__)
    # app.config['SECRET_KEY'] = SECRET_KEY
    # app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{DB_USER}:{DB_PWD}@{DB_HOST}/{DB_NAME}"
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")


    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Configure Flask-Uploads
    app.config['UPLOADED_PHOTOS_DEST'] = './diy_app/uploaded/images'   

    # Initialize extensions
    db.init_app(app)  # Initialize db with the Flask app

    with app.app_context():
        db.create_all()

    # Import and register blueprints
    from diy_app.routes import app_routes
    app.register_blueprint(app_routes)

    # Function to configure Flask-Uploads
    configure_file_uploads(app)

    CORS(app, origins=["*"])
   
    return app

app = create_app()


if __name__ == "__main__":
    # app = create_app()
    # HOST = os.getenv('FLASK_HOST', '0.0.0.0') 
    # PORT = int(os.getenv('FLASK_PORT', 5000)) 

    app.run(host='0.0.0.0', port=5000, debug=True)
