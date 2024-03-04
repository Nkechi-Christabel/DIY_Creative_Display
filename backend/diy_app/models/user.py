import bcrypt
from diy_app.models import db
from diy_app.models.base_model import Base


class User(Base):
    __tablename__ = 'users'
    fullName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(60), unique=True, nullable=False)
    post = db.relationship('Post', backref=db.backref('users', lazy=True), cascade="all, delete-orphan")
     

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password.encode())
