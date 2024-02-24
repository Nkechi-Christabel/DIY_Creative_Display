import bcrypt
from diy_app.models import db
from diy_app.models.base_model import Base


class User(Base):
    __tablename__ = 'users'
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    pwd = db.Column(db.String(60), unique=True, nullable=False)
     

    def set_password(self, password):
        self.pwd = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.pwd.encode())