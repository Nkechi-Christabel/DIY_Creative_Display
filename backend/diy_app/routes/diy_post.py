from flask import jsonify, request
from diy_app.models.post import Post
from . import app_routes
from diy_app.models import db
from diy_app.auth import token_required
import json
import os
from supabase import create_client, Client
from urllib.parse import urlparse
from dotenv import load_dotenv


load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def upload_file(file):
    bucket_name = "Images"
    file_path = os.path.join(bucket_name, file.filename).replace("\\", "/")

    # Check if the file already exists
    existing_files = supabase.storage.from_(bucket_name).list(bucket_name)
    if any(f['name'] == file.filename for f in existing_files):
        public_url = supabase.storage.from_(bucket_name).get_public_url(file_path)
        return public_url

    # Read the file content
    file_content = file.read()

    response = supabase.storage.from_(bucket_name).upload(file_path, file_content)
    if response.status_code == 200:
        public_url = supabase.storage.from_(bucket_name).get_public_url(file_path)
        return public_url
    else:
        return



def delete_file(public_url):
    bucket_name = "Images"

    # Parse the URL to get the file path
    parsed_url = urlparse(public_url)
    file_path = parsed_url.path.lstrip("/")  # Remove the leading slash

    # Remove redundant 'Images/' if it appears twice
    file_name = file_path.split(f"{bucket_name}/")[-1]  # Get the part after the first 'Images/'

    # Remove any query parameters, like the '?'
    file_name = file_name.split("?")[0]
    full_file_path = f"{bucket_name}/{file_name}"
    print(full_file_path)


    # Delete the file using the full path
    supabase.storage.from_(bucket_name).remove([full_file_path])



# Creates a post
@app_routes.route('/post', methods=['POST'])
@token_required
def create_post(current_user):
    title = request.form['title'] 
    content = request.form['content']
    categories = request.form['categories']
    user_id = current_user.id
    images = request.files.getlist('photos')

    if not images:
        return jsonify({'error': 'At least one image is required'}), 400
    if not title or not content or not categories:
        return jsonify({'error': 'Title, Content, and Categories are required fields'}), 400

    # Save uploaded images and get their filenames
    filenames = []
    for image in images:
        public_url = upload_file(image)
        if not public_url:
            return jsonify({'error': 'Upload failed'}), 400
                
        filenames.append(public_url)

        
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
        post_data = post.to_dict()
        posts_data.append(post_data)

    return jsonify(posts_data), 200


# Gets a Post with a specific id
@app_routes.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = db.session.get(Post, post_id)

    post_data = post.to_dict()

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
    post = db.session.get(Post, post_id)
    
    # Checks if current user is authorized to update the post
    if current_user_id == post.user_id:
        post.title = title
        post.content = content
        post.categories = categories
        if images:
            image_filenames = json.loads(post.image_filenames)

            # Deletes Images Associated with the post
            for filename in image_filenames:
                delete_file(filename)
            
            # Save uploaded images and get their filenames
            filenames = []
            for image in images:
                try:
                    public_url = upload_file(image)
                    if public_url:
                        filenames.append(public_url)
                except:
                    return jsonify({'error': 'Upload failed'}), 400
                
            filenames_json = json.dumps(filenames)
            post.image_filenames = filenames_json
        db.session.commit()

        post_data = post.to_dict()
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
            delete_file(filename)

        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200
    else:
        return jsonify({'message': 'Unauthorized to delete this post'}), 403
