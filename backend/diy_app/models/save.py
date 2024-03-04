from diy_app.models import db
from diy_app.models.base_model import Base

class Save(Base):
    __tablename__ = "Saves"
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'post_details': self.post.to_dict() if self.post else None
        }