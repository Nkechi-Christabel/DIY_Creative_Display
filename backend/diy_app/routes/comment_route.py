from diy_app.models import db
from flask import request, jsonify
from diy_app.models.post import Post
from diy_app.models.comment import Comment
from . import app_routes 
from diy_app.auth import token_required


# Endpoint for Adding Comments
@app_routes.route('/post/<int:post_id>/comment', methods=['POST'])
@token_required
def create_comment(current_user, post_id):
    data = request.get_json()

    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    content = data.get('content')
    user_id = current_user.id

    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    new_comment = Comment(user_id=user_id, post_id=post_id, content=content)
    db.session.add(new_comment)
    db.session.commit()

    
    
    return jsonify({'message': 'Comment added Successfully', 'new_comment': new_comment.to_dict()}), 201


# Get all comment in a Post
@app_routes.route('/post/<int:post_id>/comments', methods=['GET'])
def get_post_comments(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    comments = Comment.query.filter_by(post_id=post_id).all()
    # Serialize comments if needed
    serialized_comments = [comment.to_dict() for comment in comments]
    return jsonify(serialized_comments), 200


# Delete comment
@app_routes.route('/post/<int:post_id>/comment/<int:comment_id>', methods=['DELETE'])
@token_required
def delete_comment(current_user, post_id, comment_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not Found'}), 404
    
    user_id = current_user.id

    comment = Comment.query.get(comment_id)
    if not comment or comment.post_id != post_id:
        return jsonify({'error': 'Comment not found or not associated with the post'}), 404
    
    if comment.user_id == user_id:
        db.session.delete(comment)
        db.session.commit()

        return jsonify({'message': 'Comment deleted Successfully'}), 200
    else:
        return jsonify({'message': 'Unauthorized to delete this post'}), 403


# update comment
@app_routes.route('/post/<int:post_id>/comment/<int:comment_id>', methods=['PUT'])
@token_required
def update_comment(current_user, post_id, comment_id):
    data = request.get_json()

    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    content = data.get('content')
    user_id = current_user.id

    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not Found'}), 404
    
    comment = Comment.query.get(comment_id)
    if not comment or comment.post_id != post_id:
        return jsonify({'error': 'Comment not found or not associated with the post'}), 404
    
    if comment.user_id == user_id:
        comment.content = content
        db.session.commit()
        print("Commment", comment)
        return jsonify({'message': 'Comment updated Successfully', 'updateComment': comment.to_dict()}), 201
    else:
        return jsonify({'message': 'Unauthorized to update this post'}), 403