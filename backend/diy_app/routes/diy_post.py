from flask import jsonify, request, send_from_directory
from diy_app.models.post import Post
from . import app_routes
from diy_app.models import db
from diy_app.auth import token_required
from flask_uploads import UploadSet, configure_uploads, IMAGES, UploadNotAllowed
import json
import os
from flask import send_from_directory


photos = UploadSet('photos', IMAGES)


# Function to configure Flask-Uploads
def configure_file_uploads(app):
    # Set the upload folder to a directory named "uploaded_images" within your Flask app directory
    upload_folder = os.path.join(os.getcwd(), 'uploaded_images')
    app.config['UPLOADS_DEFAULT_DEST'] = upload_folder
    configure_uploads(app, photos)

# Route to serve uploaded images
@app_routes.route('/_uploads/photos/<path:filename>', methods=['GET'])
def download_file(filename):
    app = app_routes._get_current_object().app
    return send_from_directory(app.config['UPLOADS_DEFAULT_DEST'], filename)

# Function to configure Flask-Uploads
# def configure_file_uploads(app):
#     configure_uploads(app, photos)

# Route to serve uploaded images
# @app_routes.route('/_uploads/photos/<path:filename>', methods=['GET'])
# def ownload_file(filename):
#     path = '/home/ubuntu/DIY_Creative_Display/backend/diy_app/uploaded/images'
#     return send_from_directory(path, filename)



# Creates a post
@app_routes.route('/post', methods=['POST'])
@token_required
def create_post(current_user):
    title = request.form['title'] 
    content = request.form['content']
    categories = request.form['categories']
    user_id = current_user.id
    images = request.files.getlist('photos')

    if not title or not content or not categories:
        return jsonify({'error': 'Title, Content, and Categories are required fields'}), 400

    # Save uploaded images and get their filenames
    filenames = []
    for image in images:
        try:
            filename = photos.save(image)
            filenames.append(filename)
        except UploadNotAllowed:
            return jsonify({'error': 'Invalid file type'}), 400
        
    filenames_json = json.dumps(filenames)

    new_post = Post(title=title, content=content, categories=categories, user_id=user_id, image_filenames=filenames_json)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully'}), 201


# Gets all Posts
@app_routes.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_data = []

    for post in posts:
        # Parse the JSON string stored in the image_filenames field into a list of filenames
        try:
            image_filenames = json.loads(post.image_filenames)
        except json.JSONDecodeError:
            image_filenames = []  # Handle cases where image_filenames is invalid JSON or empty

        # Create URLs for accessing the images based on the filenames
        image_urls = [photos.url(filename) for filename in image_filenames if filename]
        
        post_data = post.to_dict()
        post_data['photos'] = image_urls

        posts_data.append(post_data)

    return jsonify(posts_data), 200


# Gets a Post with a specific id
@app_routes.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    # post = Post.query.get_or_404(post_id)
    post = db.session.get(Post, post_id)

    # Parse the JSON string stored in the image_filenames field into a list of filenames
    image_filenames = json.loads(post.image_filenames)

    # Create URLs for accessing the images based on the filenames
    image_urls = [photos.url(filename) for filename in image_filenames]

    post_data = post.to_dict()
    post_data['photos'] = image_urls

    return jsonify(post_data), 200



# Update a Post by a user
@app_routes.route('/post/<int:post_id>', methods=['PUT'])
@token_required
def update_post(current_user, post_id):
    
    title = request.form['title']
    content = request.form['content']
    categories = request.form['categories']
    images = request.files.getlist('photos')

    if not title or not content or not categories:
        return jsonify({'error': 'Title, Content, and Categories are required fields'}), 400

    current_user_id = current_user.id
    # Query the Database for post_id, if failed return 404 error
    # post = Post.query.get_or_404(post_id)
    post = db.session.get(Post, post_id)
    
    # Checks if current user is authorized to update the post
    if current_user_id == post.user_id:
        post.title = title
        post.content = content
        post.categories = categories
        if images:
            # Save uploaded images and get their filenames
            filenames = []
            for image in images:
                try:
                    filename = photos.save(image)
                    filenames.append(filename)
                except UploadNotAllowed:
                    return jsonify({'error': 'Invalid file type'}), 400
                
            filenames_json = json.dumps(filenames)
            post.image_filenames = filenames_json
        db.session.commit()

        #Including images in the data to be sent back
        image_filenames = json.loads(post.image_filenames)

        # Create URLs for accessing the images based on the filenames
        image_urls = [photos.url(filename) for filename in image_filenames]

        post_data = post.to_dict()
        post_data['photos'] = image_urls
        return jsonify({'message': 'Post updated successfully', 'updatedPost': post_data}), 201
    else:
        return jsonify({'message': 'Unauthorized to update this post'}), 403


# Delete a Post
@app_routes.route('/post/<int:post_id>', methods=['DELETE'])
@token_required
def delete_post(current_user, post_id):
    current_user_id = current_user.id
    # post = Post.query.get_or_404(post_id)
    post = db.session.get(Post, post_id)

    # Checks if current user is authorized to delete the post
    if current_user_id == post.user_id:
        image_filenames = json.loads(post.image_filenames)

        # Deletes Images Associated with the post
        for filename in image_filenames:
            file_path = os.path.join('./diy_app/uploaded/images', filename)
            if os.path.exists(file_path):
                os.remove(file_path)

        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200
    else:
        return jsonify({'message': 'Unauthorized to delete this post'}), 403
