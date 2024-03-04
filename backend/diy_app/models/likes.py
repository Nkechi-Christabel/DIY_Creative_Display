from diy_app.models import db
from diy_app.models.base_model import Base

class Like(Base):
    __tablename__ = "likes"
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    