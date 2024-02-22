import bcrypt
from app.extensions import db
from app.utils import generate_password_hash
from app.models.base_model import Base


class User(Base):
    __tablename__ = 'users'
    name = db.Column(db.String(50))
    username = db.Column(db.String(30))
    email = db.Column(db.String(100))
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password_hash.encode())