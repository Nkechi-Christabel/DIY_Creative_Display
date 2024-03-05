from diy_app.models import db
from diy_app.models.base_model import Base
from datetime import datetime

class Post(Base):
    __tablename__ = 'posts'
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    categories = db.Column(db.String(100), nullable=False)
    image_filenames = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    like = db.relationship('Like', backref=db.backref('post', lazy=True), cascade="all, delete-orphan")
    comment = db.relationship('Comment', backref=db.backref('post', lazy=True), cascade="all, delete-orphan")
    save = db.relationship('Save', backref=db.backref('post', lazy=True), cascade="all, delete-orphan")

    def __repr__(self):
        return f"('{self.id}', '{self.title}', '{self.content}', '{self.date_posted}', '{self.picture}', '{self.user_id}')"
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'date': self.date_posted, #.isoformat(), Convert datetime to string
            'categories': self.categories,
            # 'picture': self.picture,
            'user_id': self.user_id
        }
