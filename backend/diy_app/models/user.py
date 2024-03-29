import bcrypt
from diy_app.models import db
from diy_app.models.base_model import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'
    fullName = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(60), unique=True, nullable=False)
    post = db.relationship('Post', backref=db.backref('user', lazy=True), cascade="all, delete-orphan")
    like = db.relationship('Like', backref=db.backref('user', lazy=True), cascade="all, delete-orphan")
    comment = db.relationship('Comment', backref=db.backref('user', lazy=True), cascade="all, delete-orphan")
    save = db.relationship('Save', backref=db.backref('user', lazy=True), cascade="all, delete-orphan")
    date_joined = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password.encode())
    
    def to_dict(self):
        return {
            'fullName': self.fullName,
            'email': self.email,
            'date_joined': self.date_joined,
            'id': self.id,
        }