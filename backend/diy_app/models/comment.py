from diy_app.models import db
from diy_app.models.base_model import Base
from datetime import datetime
class Comment(Base):
    __tablename__ = "comments"
    content = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        return {
            'content': self.content,
            'user': self.user.to_dict() if self.user else None,
            'post_id': self.post_id,
            'date_posted': self.date_posted,
            'id': self.id
        }