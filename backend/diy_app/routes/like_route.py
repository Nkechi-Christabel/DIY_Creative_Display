from diy_app.models import db
from flask import jsonify
from diy_app.models.post import Post
from diy_app.models.likes import Like
from . import app_routes 
from diy_app.auth import token_required


# Endpoint for like and Unlike
# @app_routes.route('/post/<int:post_id>/like', methods=['POST'])
# @token_required
# def like_post(current_user, post_id):
#     user_id = current_user.id

#     post = db.session.get(Post, post_id)
#     if not post:
#         return jsonify({'error': 'Post not Found'}), 404
    
#     like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
#     if like:
#         db.session.delete(like)
#         db.session.commit()
#         likes_count = Like.query.filter_by(post_id=post_id).count()

#         return jsonify({'message': 'Post unliked Successfully', 'likes_count': likes_count,  'post_id': post_id}), 200
#     else:
#         new_like = Like(user_id=user_id, post_id=post_id)
#         db.session.add(new_like)
#         db.session.commit()
#         likes_count = Like.query.filter_by(post_id=post_id).count()
#         return jsonify({'message': 'Post liked Successfully', 'likes_count': likes_count, 'post_id': post_id}), 200


@app_routes.route('/post/<int:post_id>/like', methods=['POST'])
@token_required
def like_post(current_user, post_id):
    user_id = current_user.id

    post = db.session.get(Post, post_id)
    if not post:
        return jsonify({'error': 'Post not Found'}), 404

    # Fetch the existing like for the user (if any)
    like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()

    if like:
        # Unlike scenario
        db.session.delete(like)
    else:
        # Like scenario
        new_like = Like(user_id=user_id, post_id=post_id)
        db.session.add(new_like)

    # Update and commit changes
    db.session.commit()

    # Fetch updated likes count and post ID
    likes_count = Like.query.filter_by(post_id=post_id).count()

    return jsonify({
        'message': 'Post like status updated successfully',
        'likes_count': likes_count,
        'post_id': post_id,
        'isLiked': not bool(like)  # Flag indicating current like status
    }), 200
