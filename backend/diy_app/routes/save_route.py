from diy_app.models import db
from flask import jsonify
from diy_app.models.post import Post
from diy_app.models.save import Save
from . import app_routes 
from diy_app.auth import token_required


# Saves a Post
@app_routes.route('/post/<int:post_id>/save', methods=['POST'])
@token_required
def save_post(current_user, post_id):
    user_id = current_user.id

    # diypost = Post.query.get(post_id)
    post = db.session.get(Post, post_id)
    if not post:
        return jsonify({'error': 'Post not Found'}), 404
    
    save = Save.query.filter_by(user_id=user_id, post_id=post_id).first()
    if save:
        db.session.delete(save)
        db.session.commit()
        saves_count = Save.query.filter_by(user_id=user_id).count()
        return jsonify({'message': 'Post Unsaved Successfully', 'Saves_count': saves_count}), 200
    else:
        new_save = Save(user_id=user_id, post_id=post_id)
        db.session.add(new_save)
        db.session.commit()
        saves_count = Save.query.filter_by(user_id=user_id).count()
        return jsonify({'message': 'Post Saved Successfully', 'Saves_count': saves_count}), 200


# Get saved Post by a user
@app_routes.route('/saves', methods=['GET'])
@token_required
def get_save_post(current_user):
    user_id = current_user.id

    saves = Save.query.filter_by(user_id=user_id).all()

    if not saves:
        return jsonify({'message': 'No saved posts found for the user'}), 404
    
    saved_posts = [save.to_dict() for save in saves]
    return jsonify(saved_posts), 200


