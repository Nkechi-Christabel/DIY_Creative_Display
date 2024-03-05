from flask import jsonify, request
from diy_app.models.post import Post
from . import app_routes
from diy_app.models import db
from diy_app.auth import token_required
from flask_uploads import UploadNotAllowed
from flask_uploads import UploadSet, configure_uploads, IMAGES
import json


photos = UploadSet('photos', IMAGES)

# Function to configure Flask-Uploads
def configure_file_uploads(app):
    configure_uploads(app, photos)


# Creates a post
@app_routes.route('/post', methods=['POST'])
@token_required
def create_post(current_user):
    title = request.form['title']
    content = request.form['content']
    categories = request.form['categories']
    user_id = current_user.id
    images = request.files.getlist('photos')

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
        image_filenames = json.loads(post.image_filenames)

        # Create URLs for accessing the images based on the filenames
        image_urls = [photos.url(filename) for filename in image_filenames]

        post_data = post.to_dict()
        post_data['image_urls'] = image_urls

        posts_data.append(post_data)

    return jsonify(posts_data)


# Gets a Post with a specific id
@app_routes.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)

    # Parse the JSON string stored in the image_filenames field into a list of filenames
    image_filenames = json.loads(post.image_filenames)

    # Create URLs for accessing the images based on the filenames
    image_urls = [photos.url(filename) for filename in image_filenames]

    post_data = post.to_dict()
    post_data['image_urls'] = image_urls

    return jsonify(post_data), 200



# Update a Post by a user
# @app_routes.route('/post/<int:post_id>', methods=['PUT'])
# @token_required
# def update_post(current_user, post_id):
#     data = request.get_json()

#     if not data:
#         return jsonify({'message': 'No data provided'}), 400
    
#     title = data.get('title')
#     content = data.get('content')
#     categories = data.get('categories')
#     picture = data.get('picture')

#     current_user_id = current_user.id
#     # Query the Database for post_id, if failed return 404 error
#     diypost = Post.query.get_or_404(post_id)
    
#     # Checks if current user is authorized to update the post
#     if current_user_id == diypost.user_id:
#         diypost.title = title
#         diypost.content = content
#         diypost.categories = categories
#         diypost.picture = picture
#         db.session.commit()
#         return jsonify({'message': 'Post updated successfully'}), 201
#     else:
#         return jsonify({'message': 'Unauthorized to update this post'}), 403


# Delete a Post
@app_routes.route('/post/<int:post_id>', methods=['DELETE'])
@token_required
def delete_diypost(current_user, post_id):
    current_user_id = current_user.id
    diypost = Post.query.get_or_404(post_id)

    # Checks if current user is authorized to delete the post
    if current_user_id == diypost.user_id:
        db.session.delete(diypost)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200
    else:
        return jsonify({'message': 'Unauthorized to delete this post'}), 403
